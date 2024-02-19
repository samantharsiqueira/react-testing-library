import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PokemonType } from '../types';
import { FavoritePokemon } from '../pages';

describe('Test Suite - Testes do About', () => {
  test('No favorite pokemon found', () => {
    // Acessar
    renderWithRouter(<App />, { route: '/favorites' });
    const notFoundEl = screen.getByText(/no favorite pokémon found/i);
    // Agir
    // Aferir
    expect(notFoundEl).toBeInTheDocument();
  });

  test('rendered only favorite pokemons', () => {
    const pokemonMock: PokemonType[] = [
      { id: 1, name: 'Pikachu', type: 'Electric', image: 'pikachu.png', moreInfo: '', summary: '', averageWeight: { value: '', measurementUnit: '' }, foundAt: [] },
      { id: 2, name: 'Alakazan', type: 'Psychic', image: 'alakazan.png', moreInfo: '', summary: '', averageWeight: { value: '', measurementUnit: '' }, foundAt: [] },
    ];
    // Acessar
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonMock } />);

    // Agir
    // Aferir
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Alakazan')).toBeInTheDocument();
  });
});
