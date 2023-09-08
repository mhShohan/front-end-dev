import { render, screen } from '@testing-library/react';

import Greet from './Greet';

test('Greet render correctly', () => {
  render(<Greet />);
  const textElement = screen.getByText('Greet');
  expect(textElement).toBeInTheDocument();
});
