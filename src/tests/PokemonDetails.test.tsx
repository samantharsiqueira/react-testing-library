import { screen } from '@testing-library/react';

// A página deve conter um texto <name> Details, em que <name> é o nome do Pokémon.
test('text <name> Pokemon Details', () => {});

// Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
test('no Nav links to pokemons details', () => {});

// A seção de detalhes deve conter um heading h2 com o texto Summary.
test('heading h2 Summary text', () => {
  // Acessar
  expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
});

// A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
test('Pokemon brief in a p tag', () => {});

// Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:
test('location section in page', () => {});

// A página deve exibir um checkbox que permite favoritar o Pokémon.
// Cliques alternados no checkbox devem adicionar e remover, respectivamente, o Pokémon da lista de favoritos.
// O label do checkbox deve conter o texto Pokémon favoritado?.
test('checkbox tests', () => {});
