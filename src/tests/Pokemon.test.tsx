import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

// Mock do Pokemone
const PikachuSprite = 'Pikachu sprite';
const mockPokemon = {
  id: 1,
  name: 'Pikachu',
  type: 'Electric',
  image: 'pikachu.png',
  averageWeight: { value: '6', measurementUnit: 'kg' },
  foundAt: [],
  moreInfo: '',
  summary: '',
};

// Verifica se o componente renderiza corretamente com as informações do Pokémon
test('renders Pokemon card with correct information', () => {
  renderWithRouter(<Pokemon
    pokemon={ mockPokemon }
    showDetailsLink
    isFavorite={ false }
  />);

  expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6 kg');
  expect(screen.getByAltText(PikachuSprite)).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/1');
});

test('renders Pokemon card with correct information', async () => {
  renderWithRouter(<Pokemon
    pokemon={ mockPokemon }
    showDetailsLink
    isFavorite={ false }
  />);

  userEvent.click(screen.getByText('More details'));

  // Aguarda a próxima renderização para verificar se a URL foi alterada
  await waitFor(() => {
    expect(window.location.pathname).toBe(`/pokemon/${mockPokemon.id}`);
  });
});

test('favorite icon appears', () => {
  renderWithRouter(<Pokemon
    pokemon={ mockPokemon }
    showDetailsLink
    isFavorite
  />);

  expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  expect(screen.getByAltText('Pikachu is marked as favorite')).toHaveAttribute('src', '/star-icon.png');
});

test('renders Pokemon image', async () => {
  renderWithRouter(<Pokemon
    pokemon={ mockPokemon }
    showDetailsLink
    isFavorite={ false }
  />);

  expect(screen.getByAltText(PikachuSprite)).toBeInTheDocument();
  expect(screen.getByAltText(PikachuSprite)).toHaveAttribute('src', 'pikachu.png');
});
