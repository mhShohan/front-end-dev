import { render, screen } from '@testing-library/react';

import Greet from './Greet';

test('Greet render correctly', () => {
  render(<Greet />);
  const textElement = screen.getByText('Hello, !');
  expect(textElement).toBeInTheDocument();
});

test('Greet render with name', () => {
  render(<Greet name='Shohan' />);
  const textElement = screen.getByText('Hello, Shohan!');
  expect(textElement).toBeInTheDocument();
});
