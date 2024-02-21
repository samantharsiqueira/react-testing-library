import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import * as mocks from '../services/pokedexService';

// Desestruturação para obter o array 'foundAt' do primeiro Pokémon na lista
const { foundAt: PokemonLocations } = pokemonList[0];

test('Pokemon detailed informations are rendered', async () => {
  // Renderiza o componente 'App' envolto em um objeto 'user' retornado por 'renderWithRouter'
  const { user: userActions } = renderWithRouter(<App />);

  // Simula o clique em um link com o texto "More details"
  await userActions.click(screen.getByRole('link', { name: /more details/i }));

  // Verifica o que aparece no mais detalhes
  expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();

  // Verifica se o texto contendo "hard berries with electricity" está presente na tela
  expect(screen.getByText(/hard berries with electricity /i));
});

test('There is a location and maps section', () => {
  renderWithRouter(<App />, { route: '/pokemon/25' });

  expect(screen.getByRole('heading', { name: /game locations of pikachu/i }))
    .toBeInTheDocument();

  // Itera sobre a lista de locais onde o Pikachu pode ser encontrado e verifica se cada um está presente na tela
  if (pokemonList[0]?.foundAt) {
    pokemonList[0].foundAt.forEach((value) => {
      expect(screen.getByText(value.location)).toBeInTheDocument();
    });
  }
  // Testa as imagens com o atributo 'alt' contendo "pikachu location"
  const imgEl = screen.getAllByAltText(/pikachu location/i);
  expect(imgEl).toHaveLength(2);
  if (PokemonLocations && PokemonLocations[0] && PokemonLocations[1]) {
    expect(imgEl[0]).toHaveAttribute('src', PokemonLocations[0].map);
    expect(imgEl[1]).toHaveAttribute('src', PokemonLocations[1].map);
  }
});

test('Favorite button is working properly', async () => {
  // Precisei alterar o id do pokemon pra poder corrigir o erro de 1 pra 25;
  const { user: userActions } = renderWithRouter(<App />, { route: '/pokemon/25' });

  // Espiona a função 'getFavoritePokemonList' do módulo 'mocks'
  const mocked = vi.spyOn(mocks, 'getFavoritePokemonList');

  // Obtém o checkbox com o rótulo "Pokémon favoritado?"
  const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

  // Verifica se o checkbox está presente na tela
  expect(checkbox).toBeInTheDocument();

  // Simula o clique no checkbox
  await userActions.click(checkbox);

  // Verifica se a função 'getFavoritePokemonList' foi chamada
  expect(mocked).toHaveBeenCalled();

  // Verifica se o Pokémon foi marcado como favorito na lista retornada pela função espionada
  expect(mocked.mock.results[0].value[25]).toBeTruthy();

  // Simula o clique novamente no checkbox para desmarcar o Pokémon como favorito
  await userActions.click(checkbox);

  // Verifica se o Pokémon foi desmarcado como favorito na lista retornada pela função espionada
  expect(mocked.mock.results[3].value[25]).toBeFalsy();
});
