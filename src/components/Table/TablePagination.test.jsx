import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TablePagination } from './TablePagination';

describe('TablePagination Component', () => {

  const defaultProps = {
    items: 100,
    itemsPerPage: [10, 20, 50],
    currentItemsPerPage: 10,
    setCurrentItemsPerPage: vi.fn(),
    currentPage: 1,
    firstItem: 1,
    lastItem: 10,
    setCurrentPage: vi.fn(),
  };

  it('renders pagination buttons when number of pages > 1', () => {
    render(<TablePagination {...defaultProps} />);
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('disables "First" and "Back" buttons on the first page', () => {
    render(<TablePagination {...defaultProps} currentPage={1} />);
    
    expect(screen.getByText('First').closest('button')).toBeDisabled();
    expect(screen.getByText('Back').closest('button')).toBeDisabled();
  });

  it('disables "Next" and "Last" buttons on the last page', () => {
    render(<TablePagination {...defaultProps} currentPage={10} firstItem={91} lastItem={100} />);
    
    expect(screen.getByText('Next').closest('button')).toBeDisabled();
    expect(screen.getByText('Last').closest('button')).toBeDisabled();
  });

  it('calls setCurrentPage when clicking pagination buttons', () => {
    render(<TablePagination {...defaultProps} currentPage={2} />);

    fireEvent.click(screen.getByText('First'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Back'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Next'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('Last'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(10);
  });

  it('renders the correct page numbers based on items and items per page', () => {
    render(<TablePagination {...defaultProps} />);

    // Debe haber 10 páginas (100 ítems / 10 por página)
    // Verificamos que existen 10 botones que contenga en el nombre de la clase 'btn_page'
    const pageButtons = document.querySelectorAll('button[class*="btn_page"]');
    expect(pageButtons.length).toBe(10);
    expect(pageButtons[0]).toHaveTextContent('1');
    expect(pageButtons[9]).toHaveTextContent('10');
  });

  it('changes items per page when selecting a new option', () => {
    render(<TablePagination {...defaultProps} />);

    const select = document.querySelector('select');
    fireEvent.change(select, { target: { value: '20' } });

    expect(defaultProps.setCurrentItemsPerPage).toHaveBeenCalledWith(20);
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1); // Debe resetear a la primera página
  });

});
