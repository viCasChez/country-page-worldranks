import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Region } from './Region';

const allRegions = ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'];
const filterByRegion = vi.fn();

// Mock del store para controlar `allRegions` y `filterByRegion`
vi.mock('../../store/store', () => ({
  default: () => ({
    allRegions,
    filterByRegion,  // Simula la función filterByRegion para poder rastrearla
  }),
}));

const addClass = (regionSelected) => {
  expect(regionSelected.className).not.toContain('selected');
  fireEvent.click(regionSelected);
  expect(regionSelected.className).toContain('selected');
}

const removeClass = (regionSelected) => {
  expect(regionSelected.className).toContain('selected');
  fireEvent.click(regionSelected);
  expect(regionSelected.className).not.toContain('selected');
}

describe('Region Component', () => {
  let containerRegion;

  beforeEach(() => {
    const renderResult = render(<Region />);
    containerRegion = renderResult.container;
  });

  it('Render title Region', () => {
    const pElement = document.querySelector('section p');

    expect(pElement).toBeInTheDocument();
    expect(pElement.innerHTML).toContain('Region');
  });

  it('Render list all regions', () => {
    allRegions.map( region => 
      expect(containerRegion.innerHTML).toContain(region)
    );
  });

  it('Add selected class when a region is clicked', () => {
    const regionSelected = screen.getByText('Europe');
    addClass(regionSelected);
  });

  it('Remove selected class when selected region is clicked', () => {
    const regionSelected = screen.getByText('Europe');
    addClass(regionSelected);
    removeClass(regionSelected);
  });

  it('Calls filterByRegion when a region is selected or deselected', () => {
    const regionSelected = screen.getByText('Europe');
  
    // Simular que "Europe" está seleccionado y Verificar que filterByRegion se llamó con ['Europe']
    addClass(regionSelected);
    expect(filterByRegion).toHaveBeenCalledWith(['Europe']);

    // Simular que "Europe" está desmarcado y Verificar que filterByRegion se llamó con []
    removeClass(regionSelected);
    expect(filterByRegion).toHaveBeenCalledWith([]);
  });

});

