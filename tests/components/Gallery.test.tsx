import Gallery from '@/components/Gallery';
import { render, screen } from '@testing-library/react';

describe('Gallery component', () => {
  it('should render without crashing', () => {
    render(
      <Gallery
        photos={[]}
        fetchNextPage={vi.fn()}
        hasMore={false}
        isLoading={false}
        isInitialLoading={false}
      />,
    );
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
  });
});
