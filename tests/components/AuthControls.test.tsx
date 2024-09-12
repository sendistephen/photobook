import { vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AllProviders } from 'tests/AllProviders';
import { AuthControls } from '@/components/Navbar/AuthControls';
import { setUser, clearUser } from '@/store/authSlice';
import * as firebaseAuth from '@/firebase/firebaseAuth';
import { store } from '@/store';

// Mock the signInWithGoogle function from firebaseAuth
vi.mock('@/firebase/firebaseAuth', () => ({
  signInWithGoogle: vi.fn(),
  signOut: vi.fn(),
}));

describe('AuthControls', () => {
  it('should render `LoginButton` when user is not logged in', () => {
    // Ensure user is not logged in
    store.dispatch(clearUser());

    render(
      <AllProviders>
        <AuthControls />
      </AllProviders>,
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should render `LogoutButton` when user is logged in', () => {
    const mockUser = {
      uid: '123',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      photoURL: 'https://example.com/john.jpg',
    };
    store.dispatch(setUser(mockUser));

    render(
      <AllProviders>
        <AuthControls />
      </AllProviders>,
    );

    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });

  it('should call handleLogin when clicking the Login button', () => {
    store.dispatch(clearUser());

    const mockUser = {
      uid: '123',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      photoURL: 'https://example.com/john.jpg',
    };

    // Mock the signInWithGoogle function to return the mockUser
    (firebaseAuth.signInWithGoogle as Mock).mockResolvedValue(mockUser);

    render(
      <AllProviders>
        <AuthControls />
      </AllProviders>,
    );

    fireEvent.click(screen.getByText(/login/i));
    expect(firebaseAuth.signInWithGoogle).toHaveBeenCalled();
  });

  it('should call handleLogout when clicking the Logout button and render LoginButton again', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      photoURL: 'https://example.com/john.jpg',
    };

    store.dispatch(setUser(mockUser));

    render(
      <AllProviders>
        <AuthControls />
      </AllProviders>,
    );

    // Ensure the logout button is rendered
    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument();

    // Simulate clicking the logout button
    fireEvent.click(logoutButton);

    // Ensure the mock function was called
    expect(firebaseAuth.signOut).toHaveBeenCalled();

    // Ensure the login button is rendered again
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
