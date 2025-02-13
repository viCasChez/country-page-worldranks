import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableHeader } from './TableHeader';

describe('TableHeader Component', () => {

  it('renders all standard headers', () => {
    render(<TableHeader isMobile={false} />);  // Renderiza en modo desktop

    // Verificar que Flag, Name, Population y Area (km2) son visibles
    expect(screen.getByText('Flag')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Area (km2)')).toBeInTheDocument();
  });

  it('renders Region header when not in mobile view', () => {
    render(<TableHeader isMobile={false} />);  // Renderiza en modo desktop

    // Verificar que 'Region' aparece cuando no es móvil
    expect(screen.getByText('Region')).toBeInTheDocument();
  });

  it('does not render Region header in mobile view', () => {
    render(<TableHeader isMobile={true} />);  // Renderiza en modo móvil

    // Verificar que 'Region' NO aparece cuando es móvil
    expect(screen.queryByText('Region')).not.toBeInTheDocument();
  });

});
