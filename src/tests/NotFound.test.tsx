import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('page requested not found h2 heading', () => {
  // Acessar
  render(<NotFound />);
  const notFoundEl = screen.getByRole('heading', { name: /page requested not found/i });
  // Aferir
  expect(notFoundEl).toBeInTheDocument();
});

test('Alternative text image', () => {
// Acessar
  render(<NotFound />);
  const img = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  // Agir
  // Aferir
  expect(img).toHaveAttribute('src', '/404.gif'); // o src eh diferente do read.me
});
