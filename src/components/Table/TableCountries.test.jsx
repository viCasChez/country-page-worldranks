import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TableCountries } from './TableCountries';

// 🔹 Definir mockCountries una vez para reutilizarlo en todas las pruebas
const mockCountries = [
  {
    flag: 'https://flagcdn.com/w320/cn.png',
    name: 'China',
    population: 1402112000,
    area: 9706961,
    region: 'Asia',
  },
  { 
    flag: 'https://flagcdn.com/w320/es.png', 
    name: 'Spain', 
    population: 47450795, 
    area: 505992, 
    region: 'Europe' 
  }
];

describe('TableCountries Component', () => {

  it('renders "Sin resultados..." when the countries array is empty', () => {
    render(<TableCountries countries={[]} handleCountryClick={() => {}} isMobile={false} />);
    expect(screen.getByText('Sin resultados...')).toBeInTheDocument();
  });

  it('renders a list of countries when data is provided', () => {
    render(<TableCountries countries={mockCountries} handleCountryClick={() => {}} isMobile={false} />);
    
    expect(screen.getByText('China')).toBeInTheDocument();
    expect(screen.getByText('1.402.112.000')).toBeInTheDocument();
    expect(screen.getByText('9.706.961')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Spain')).toBeInTheDocument();
    expect(screen.getByText('47.450.795')).toBeInTheDocument();
    expect(screen.getByText('505.992')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('calls handleCountryClick when a country is clicked', () => {
    const handleCountryClick = vi.fn(); // Mock de la función
    
    render(<TableCountries countries={mockCountries} handleCountryClick={handleCountryClick} isMobile={false} />);

    const countryElement = screen.getByText('Spain');
    fireEvent.click(countryElement);

    expect(handleCountryClick).toHaveBeenCalledWith('Spain');
    expect(handleCountryClick).toHaveBeenCalledTimes(1);
  });

  it('does not display the region when in mobile view', () => {
    render(<TableCountries countries={mockCountries} handleCountryClick={() => {}} isMobile={true} />);

    expect(screen.queryByText('Europe')).not.toBeInTheDocument(); // La región no debe aparecer en móvil
  });

  it('displays the region when not in mobile view', () => {
    render(<TableCountries countries={mockCountries} handleCountryClick={() => {}} isMobile={false} />);

    expect(screen.getByText('Europe')).toBeInTheDocument(); // La región debe aparecer en escritorio
  });

});
