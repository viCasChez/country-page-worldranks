import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table } from './Table';

// Mock de los subcomponentes para simplificar las pruebas
vi.mock('./TableHeader', () => ({
  TableHeader: () => <div>Table Header</div>,
}));
vi.mock('./TableLoading', () => ({
  TableLoading: () => <div>Loading...</div>,
}));
vi.mock('./TableCountries', () => ({
  TableCountries: () => <div>Countries List</div>,
}));
vi.mock('./TablePagination', () => ({
  TablePagination: () => <div>Pagination</div>,
}));

describe('Table Component', () => {

  it('renders the TableHeader component always', () => {
    render(<Table data={[]} isLoading={false} error={null} />);
    expect(screen.getByText('Table Header')).toBeInTheDocument();
  });

  it('renders the error message when error prop is passed', () => {
    render(<Table data={[]} isLoading={false} error="Failed to fetch data" />);
    expect(screen.getByText(/Error: Failed to fetch data/i)).toBeInTheDocument();
  });

  it('renders the loading component when isLoading is true', () => {
    render(<Table data={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders TableCountries and TablePagination when data is available', () => {
    const mockData = [
      { name: 'China', region: 'Asia', population: 1402112000, area: 9706961, flag: 'flag_china.png' },
      { name: 'España', region: 'Europa', population: 47351567, area: 505992, flag: 'flag_spain.png' },
    ];

    render(
      <Table
        data={mockData}
        isLoading={false}
        error={null}
        itemsPerPage={[10, 20, 50, 100]}
        currentItemsPerPage={50}
        setCurrentItemsPerPage={() => {}}
        currentPage={1}
        setCurrentPage={() => {}}
        isMobile={false}
        handleCountryClick={() => {}}
      />
    );

    expect(screen.getByText('Countries List')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();
  });

});
