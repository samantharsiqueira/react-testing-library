import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Test Suite - Testes do About', () => {
  test('About Pokedex h2 heading ', () => {
    // Acessar
    renderWithRouter(<About />);
    const headingEl = screen.getByRole('heading', { name: /About Pokédex/i });
    // Agir
    // Aferir
    expect(headingEl).toBeInTheDocument();
  });

  test('two about Pokedex paragraphs ', () => {
    // Acessar
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokédex/i, { selector: 'p' });
    // Agir
    // Aferir
    expect(paragraphs).toHaveLength(1);
  });

  test('Pokedex image', () => {
    // Acessar
    renderWithRouter(<About />);
    const imgEl = screen.getByRole('img', { name: /pokédex/i }); // Esse name e o alt text;
    // Agir
    // Aferir
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
