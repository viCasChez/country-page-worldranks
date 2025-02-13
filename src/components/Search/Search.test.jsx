import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Search } from './Search';

const store = vi.hoisted(() => ({
  numResults: 272,
  filterByText: vi.fn(),
}));

vi.mock('../../store/store', () => ({
  default: () => store,
}));

const getNumResults = (numResults) => {
  return `Found ${numResults} ${numResults === 1 ? 'country' : 'countries'}`;
};

const cleanRender = () => {
  cleanup();
  render(<Search />);
}

describe('Search Component', () => {
  let inputElement;
  let pElement;

  beforeEach(() => {
    cleanRender();
    inputElement = screen.getByPlaceholderText('Search by Name, Region, Subregion');
    pElement = screen.getByText(getNumResults(store.numResults));
  });

  it('Render Search Component p and input', () => {
    expect(pElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('Calls filterByText when input changes', () => {
    fireEvent.change(inputElement, { target: { value: 'España' } });
    expect(store.filterByText).toHaveBeenCalledWith('España');
  });

  it('Updates the number of found countries dynamically', () => {
    store.numResults = 1; // Modificamos numResults del store
    cleanRender(); // Limpiamos y volvemos a renderizar
    expect(screen.getAllByText(getNumResults(store.numResults)));
  });
});
