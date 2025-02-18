import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { Status } from './Status';

const filterByStatus = vi.fn();

vi.mock('../../store/store', () => ({
  default: () => ({ filterByStatus }),
}));

describe('Status Component', () => {
  let pElement, unitedNation, independent;

  beforeEach(() => {
    render(<Status />);
    pElement = screen.getByText('Status');

    const checkboxes = screen.getAllByRole('checkbox');
    unitedNation = checkboxes.find(input => input.getAttribute('name') === 'unitedNation');
    independent = checkboxes.find(input => input.getAttribute('name') === 'independent');
  });

  it('renders Status Component with pElement text', () => {
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent('Status');
  });

  it('renders two checkboxes for status selection', () => {
    expect(unitedNation).toBeInTheDocument();
    expect(unitedNation).toHaveAttribute('name', 'unitedNation');

    expect(independent).toBeInTheDocument();
    expect(independent).toHaveAttribute('name', 'independent');
  });

  it('calls filterByStatus when a status is selected', () => {
    fireEvent.click(unitedNation);
    expect(filterByStatus).toHaveBeenCalledWith(['unitedNation']);

    fireEvent.click(independent);
    expect(filterByStatus).toHaveBeenCalledWith(['unitedNation', 'independent']);
  });

  it('calls filterByStatus when a status is deselected', () => {
    fireEvent.click(unitedNation);
    expect(filterByStatus).toHaveBeenCalledWith(['unitedNation']);

    fireEvent.click(independent);
    expect(filterByStatus).toHaveBeenCalledWith(['unitedNation', 'independent']);

    fireEvent.click(unitedNation);
    expect(filterByStatus).toHaveBeenCalledWith(['independent']);
  });
});
