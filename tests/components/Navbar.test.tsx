import { Navbar } from '@/components';
import { setScreenWidth } from '@/utils/helper';
import { fireEvent, render, screen } from '@testing-library/react';
import { AllProviders } from 'tests/AllProviders';

const mockHandleToggle = vi.fn();

vi.mock('@/components/Navbar/useNavbar', () => ({
  useNavbar: () => ({
    isOpen: false,
    setIsOpen: vi.fn(),
    handleToggle: mockHandleToggle,
  }),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
      return {
        matches: window.innerWidth <= 786, // Adjust based on your media query breakpoint
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
});

describe('Navbar component', () => {
  beforeEach(() => {
    // Reset window size before each test
    setScreenWidth(1024); // Default to large screen
  });

  it('should render the navbar with links', () => {
    render(<Navbar />, { wrapper: AllProviders });

    // verify that the Navbar component is rendered correctly
    expect(screen.getByText(/photos/i)).toBeInTheDocument();
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
  });

  it('should toggle theme when the theme toggle button is clicked', () => {
    render(<Navbar />, { wrapper: AllProviders });

    const themeToggleButton = screen.getByRole('button', {
      name: /toggle theme/i,
    });
    fireEvent.click(themeToggleButton);
    expect(mockHandleToggle).toHaveBeenCalled();
  });

  it('does not display hamburger menu icons on large screens', () => {
    setScreenWidth(1024); // Large screen width

    render(<Navbar />, { wrapper: AllProviders });

    const hamburgerIcon = screen.queryByTestId('hamburger-icon');
    expect(hamburgerIcon).toBeInTheDocument();
    expect(hamburgerIcon).not.toBeVisible();

    // Close icon should not be in the document
    const closeIcon = screen.queryByTestId('close-icon');
    expect(closeIcon).not.toBeInTheDocument();
  });

  it('displays hamburger menu icon on small screens', () => {
    setScreenWidth(500); // Mobile screen width

    render(<Navbar />, { wrapper: AllProviders });

    screen.debug();
    const hamburgerIcon = screen.queryByTestId('hamburger-icon');
    expect(hamburgerIcon).toBeInTheDocument();
    expect(hamburgerIcon).toBeVisible();

    const closeIcon = screen.queryByTestId('close-icon');
    expect(closeIcon).not.toBeInTheDocument();
  });
});
