import { cleanup, render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryRanking } from './CountryRanking';
import { MemoryRouter } from 'react-router-dom';

const setCountries = vi.fn();
const setError = vi.fn();
const setCurrentPage = vi.fn();
const setCountry = vi.fn();
const allRegions = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania'];
const mockFilteredCountries = [{ 
  flag: 'https://flagcdn.com/w320/es.png', 
  name: 'Spain', 
  population: 47450795, 
  area: 505992, 
  region: 'Europe' 
}];

global.fetch = vi.fn();

vi.mock('../store/store', () => ({
  default: () => ({
    setCountries,
    allRegions,
    setError,
    isLoading: false,
    error: null,
    filteredCountries: mockFilteredCountries,
    currentPage: 1,
    setCurrentPage,
    setCountry,
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

const _renderComponent = () => {
  cleanup();
  render(
    <MemoryRouter>
      <CountryRanking />
    </MemoryRouter>
  );
}

const _getSectionClass = (sectionClass) => {
  const classComponent = document.querySelector(`[class*="${sectionClass}"]`);
  expect(classComponent).toBeInTheDocument();
  return 
}

describe('CountryRanking Component', () => {
  beforeEach(() => {
    _renderComponent();
  });

  it('Render Country Ranking all components header, search, sort, region, status, table', () => {
    const allComponents = ['cpw_header', 'cpw_search', 'cpw_sort', 'cpw_region', 'cpw_status', 'cpw_table' ];
    allComponents.forEach(classComponent => _getSectionClass(classComponent));
  });

  it('Fetches country data and calls setCountries on success', async () => {
    const mockData = [{ name: { common: 'Spain' }, flags: { png: 'https://flagcdn.com/w320/es.png' } }];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    _renderComponent();

    await waitFor(() => expect(setCountries).toHaveBeenCalledWith(mockData));
  });

  it('Handles API fetch error and calls setError', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    _renderComponent();

    await waitFor(() => expect(setError).toHaveBeenCalledWith('Network error'));
  });

  it('Navigates to country detail when a country is clicked', () => {
    fireEvent.click(screen.getByText('Spain'));

    expect(setCountry).toHaveBeenCalledWith('Spain');
    expect(mockNavigate).toHaveBeenCalledWith('/country/Spain');
  });

  it('Updates isMobile state on window resize', async () => {
    await act( async () => {
      global.innerWidth = 500; // Simular vista móvil
      global.dispatchEvent(new Event('resize'));
    })

    _renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Region')).toBeInTheDocument();
    });
  });

});
