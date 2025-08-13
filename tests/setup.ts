import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock the signInWithGoogle function from firebaseAuth
vi.mock('@/firebase/firebaseAuth', () => ({
  signInWithGoogle: vi.fn(),
  signOut: vi.fn(),
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
