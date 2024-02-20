import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import { PokemonButtonsPanel } from '../components';

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
// Teste se a página contém um heading h2 com o texto Encountered Pokémon.
test('heading Ecountered Pokemon', () => {
  // Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);
  const headingEl = screen.getByRole('heading', { name: /encountered pokémon/i });
  // Aferir
  expect(headingEl).toBeInTheDocument();
});

// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:
test('Next Pokémon on the list is displayed when clicking the button', async () => {
  // Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);
  // Agir
  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  // Aferir
  expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(screen.getByText(pokemons[2].name)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
});

// Teste se é mostrado apenas um Pokémon por vez.
test('Only one pokemon is showed at the time', () => {
  // Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);
  // Aferir
  expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
});

// Teste se a Pokédex tem os botões de filtro:
test('filter buttons for each pokemon type', async () => {
  // Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);

  // Aferir
  // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
  expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();

  // Os botões devem ser capturados pelo data-testid=pokemon-type-button.
  expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(3);
});

// A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado.
test('all button reset the filter', async () => {
// Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);

  await userEvent.click(screen.getByRole('button', { name: 'All' }));

  // Verificar se todos os Pokémon estão sendo exibidos
  pokemons.forEach(async (pokemon) => {
    expect(await screen.findAllByText(pokemon.name)).toHaveLength(1);
  });
});

test('Fire button shows only Fire-type Pokémon', async () => {
  // Acessar
  renderWithRouter(<Pokedex pokemonList={ pokemons } favoritePokemonIdsObj={ {} } />);

  // Agir
  await userEvent.click(screen.getByRole('button', { name: 'Fire' }));

  // Verificar se apenas Pokémon do tipo "Fire" estão sendo exibidos
  pokemons.forEach(async (pokemon) => {
    if (pokemon.type === 'Fire') {
      expect(await screen.findAllByText(pokemon.name)).toHaveLength(1);
    } else {
      // Se não for do tipo "Fire", não deve ser exibido
      expect(screen.queryByText(pokemon.name)).toBeNull();
    }
  });
});

test('verify if when clicked the "all" button calls filterPokemon function', () => {
  const filterPokemon = vi.fn();

  render(<PokemonButtonsPanel filterPokemon={ filterPokemon } pokemonTypes={ [] } />);

  const allButton = screen.getByRole('button', { name: /all/i });
  fireEvent.click(allButton);
  expect(filterPokemon).toHaveBeenCalledWith('all');
});
