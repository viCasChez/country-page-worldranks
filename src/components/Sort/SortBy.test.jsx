import { fireEvent, render } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { SortBy } from './SortBy';

const options = ['name', 'population', 'area', 'region'];

const store = vi.hoisted(() => ({
  sortSelected: 'population',
  sortBy: vi.fn(),
}));

vi.mock('../../store/store', () => ({
  default: () => store,
}))

describe('SortBy Component', () => {
  let selectElement;

  beforeEach(() => {
    render(<SortBy />)
    selectElement = document.querySelector('section select');
  });

  it('Render SortBy Component and pElement text', () => {
    const pElement = document.querySelector('section p');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent('Sort by');
  });

  it('Render selectElement and correct numbers of options', () => {
    expect(selectElement).toBeInTheDocument();
    const optionElements = selectElement.querySelectorAll('option');
    expect(optionElements.length).toBe(options.length);
  });

  it('Render select with correct default selected option', () => {
    expect(selectElement.value).toBe(store.sortSelected);
  });

  it('Calls sortBy when a new option is selected', () => {
    fireEvent.change(selectElement, { target: { value: 'area' } });
    expect(store.sortBy).toHaveBeenCalledWith('area');
  });

});
