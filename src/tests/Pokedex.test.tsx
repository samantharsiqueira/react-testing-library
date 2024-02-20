import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';

// Mock da lista de pokemons
const pokemons = [
  {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    image: 'pikachu.png',
    averageWeight: { value: '', measurementUnit: '' },
    foundAt: [],
    moreInfo: '',
    summary: '',
  },
  {
    id: 2,
    name: 'Rapidash',
    type: 'Fire',
    image: 'rapidash.png',
    averageWeight: { value: '', measurementUnit: '' },
    foundAt: [],
    moreInfo: '',
    summary: '',
  },
  {
    id: 3,
    name: 'Alakazam',
    type: 'Psychic',
    image: 'alakazan.png',
    averageWeight: { value: '', measurementUnit: '' },
    foundAt: [],
    moreInfo: '',
    summary: '',
  },
];

test('heading Ecountered Pokemon', () => {
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);
  const headingEl = screen.getByRole('heading', { name: /encountered pokémon/i });
  expect(headingEl).toBeInTheDocument();
});

test('Next Pokémon on the list is displayed when clicking the button', async () => {
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);

  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(screen.getByText(pokemons[2].name)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
});

test('filter buttons', () => {});

test('reset filter button', async () => {
});
