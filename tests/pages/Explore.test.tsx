import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { QueryClient } from 'react-query';
import { AllProviders } from 'tests/AllProviders';
import Explore from '../../src/pages/Explore';
import { db } from '../mocks/db';
import { server } from '../mocks/server';

const queryClient = new QueryClient();

describe('Explore', () => {
  const photoIds: string[] = [];
  beforeEach(() => {
    queryClient.clear();
  });
  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const photo = db.photo.create();
      photoIds.push(photo.id);
    });
  });

  afterAll(() => {
    db.photo.deleteMany({ where: { id: { in: photoIds } } });
  });

  it('should render a loading skeleton when fetching photos', () => {
    server.use(
      http.get('https://api.unsplash.com/photos', () => {
        return HttpResponse.json([]);
      }),
    );
    render(<Explore />, { wrapper: AllProviders });
    const skeletonElements = screen.getAllByTestId('skeleton');
    expect(skeletonElements).toHaveLength(12);
  });

  it('should render photos successfully after fetching', async () => {
    render(<Explore />, { wrapper: AllProviders });
    await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

    const photos = await screen.findAllByRole('img');
    expect(photos).toHaveLength(3);
  });

  it('should render no photos found message when no photos are found', async () => {
    server.use(
      http.get('https://api.unsplash.com/photos', () => {
        return HttpResponse.json([]);
      }),
    );

    render(<Explore />, { wrapper: AllProviders });
    const noPhotosFound = await screen.findByText('No photos found');
    expect(noPhotosFound).toBeInTheDocument();
  });
});
