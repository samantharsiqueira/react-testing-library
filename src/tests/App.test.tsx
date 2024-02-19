import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test Suite - Testes do App', () => {
  test('Render nav links', () => {
  // Acessar
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /home/i });
    const aboutEl = screen.getByRole('link', { name: /about/i });
    const pokemonEl = screen.getByRole('link', { name: /favorite pokémon/i });
    // Agir
    // Aferir
    expect(homeEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(pokemonEl).toBeInTheDocument();
  });

  test('redirect to home when link is clicked', async () => {
    // Acessar
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: 'Home' });
    // Agir
    await userEvent.click(homeEl);
    // Aferir
    expect(window.location.pathname).toBe('/');
  });

  test('redirect to about when link is clicked', async () => {
    // Acessar
    renderWithRouter(<App />);
    const aboutEl = screen.getByRole('link', { name: 'About' });
    // Agir
    await userEvent.click(aboutEl);
    // Aferir
    expect(window.location.pathname).toBe('/about');
  });

  test('redirect to favorite pokemon when link is clicked', async () => {
    // Acessar
    renderWithRouter(<App />);
    const pokemonEl = screen.getByRole('link', { name: /favorite pokémon/i });
    // Agir
    await userEvent.click(pokemonEl);
    // Aferir
    expect(window.location.pathname).toBe('/favorites');
  });
});
