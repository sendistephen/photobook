import { http, HttpResponse } from 'msw';
import { db } from './db';

const BASE_URL = import.meta.env.VITE_APP_UNSPLASH_API_URL;

export const handlers = [
  http.get(`${BASE_URL}/photos`, () => {
    const photos = db.photo.findMany({ take: 10 });
    return HttpResponse.json(photos, { status: 200 });
  }),
];

export const errorHandlers = [
  http.get(`${BASE_URL}/photos`, () => {
    return HttpResponse.error();
  }),
];
