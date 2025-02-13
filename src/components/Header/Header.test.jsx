import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('Render Header with title World Ranks', () => {
    render(<Header />);
    
    const headerElement = document.querySelector('header');
    expect(headerElement).toBeInTheDocument();

    const titleElement = document.querySelector('h1');
    expect(titleElement.innerHTML).toContain('World <span>Ranks</span>');
  });
});

