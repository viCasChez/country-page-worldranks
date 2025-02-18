import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { CountryDetail } from './CountryDetail';
import { MemoryRouter } from 'react-router-dom';

let store = vi.hoisted(() => ({
  country: null,
  setCountry: vi.fn(),
}));

vi.mock('../../store/store', () => ({
  default: () => ({
    country,
    setCountry: vi.fn(),
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const cleanRender = () => {
  cleanup();
  render(
    <MemoryRouter>
      <CountryDetail />
    </MemoryRouter>
  );
};

const renderCountry = () => {
  store = {
    country: {
      name: 'España',
      flag: '🇪🇸',
    } 
  };
  
  vi.mock('../store/store', () => ({
    default: () => store,
  }));
};

describe('CountryDetail Component', () => {

  let returnElement;

  beforeEach(() => {
    cleanRender();
    returnElement = screen.getByText('Volver');
  });

  it('Render Country Detail component with header and main article', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header />
    expect(screen.getByRole('heading')).toBeInTheDocument(); // <h1 />
    expect(screen.getByRole('main')).toBeInTheDocument(); // <main />
    expect(screen.getByRole('article')).toBeInTheDocument(); // <article />
    expect(screen.getByRole('paragraph')).toBeInTheDocument(); // <p />
    expect(screen.getByRole('strong')).toBeInTheDocument(); // <strong />
    expect(screen.getByText('País no seleccionado.')).toBeInTheDocument();
  });

  it('Click in volver', () => {
    fireEvent.click(returnElement);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  })
  
  it('Renders Detail when exist country', () => {
    renderCountry();
    cleanRender();

    const { flag, name } = store.country;

    expect(screen.queryByText('País no seleccionado.')).not.toBeInTheDocument();
    expect(screen.queryByText(`<h2>${flag} Descubre ${name}</h2>`)).toBeInTheDocument;
  });

});
