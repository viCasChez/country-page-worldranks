import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableLoading } from './TableLoading';

describe('TableLoading Component', () => {
  
  it('renders the correct number of skeleton rows', () => {
    render(<TableLoading skeletonNumbers={5} isMobile={false} />);
    
    const skeletonRows = document.querySelectorAll('section'); // Buscar directamente las etiquetas <section>
    // Verificar que se renderizan 5 secciones (cada una representa una fila de carga)
    expect(skeletonRows.length).toBe(5);
  });

  it('does not render the region column in mobile view', () => {
    render(<TableLoading skeletonNumbers={1} isMobile={true} />);

    // Verificar que solo hay 4 cajas skeleton (sin la columna de Region)
    const skeletonBoxes = document.querySelectorAll('section div');
    expect(skeletonBoxes.length).toBe(4); // 4 cajas porque la columna de Region no se muestra en mobile
  });

  it('renders the region column when not in mobile view', () => {
    render(<TableLoading skeletonNumbers={1} isMobile={false} />);

    // Verificar que hay 5 cajas skeleton (incluyendo la columna de Region)
    const skeletonBoxes = document.querySelectorAll('section div');
    expect(skeletonBoxes.length).toBe(5);
  });

});
