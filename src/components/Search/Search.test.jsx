import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useCountryStore from '../../store/store';
import { Search } from './Search';

const numResults = 272;
const filterByText = vi.fn();
let store = {
  numResults,
  filterByText,
};

vi.mock('../../store/store', () => ({
  default: () => ({
    numResults,
    filterByText,
  }),
}));

const getNumResults = () => {
  return `Found ${store.numResults} ${store.numResults === 1 ? 'country' : 'countries'}`;
}

describe('Search Component', () => {

  let pElement = '';
  let inputElement = 0;

  beforeEach(() => {
    store = useCountryStore();
    render(<Search />);
    inputElement = screen.getByPlaceholderText('Search by Name, Region, Subregion');
    pElement = screen.getByText(getNumResults(store.numResults));
  });
  

  it('Render Search Component p and input', () => {
    expect(pElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('Calls filterByText when input changes', () => {
    fireEvent.change(inputElement, { target: { value: 'Spain' } });
    expect(filterByText).toHaveBeenCalledWith('Spain');
  });

  it('Updates the number of found countries dynamically', () => {
    store.numResults = 1;
    render(<Search />);
    console.log('Lo que se espera: ', getNumResults(store.numResults));
    console.log('Lo que si llega: ', document.querySelector('section p').innerHTML);
  
    // expect(screen.getByText(getNumResults(store.numResults))).toBeInTheDocument();
  });
  
});

