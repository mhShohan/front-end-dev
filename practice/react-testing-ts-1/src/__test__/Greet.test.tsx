import { render, screen } from '@testing-library/react';

import Greet from '../components/greet/Greet';

describe('Greet', () => {
  test('render correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello, !');
    expect(textElement).toBeInTheDocument();
  });

  test('render with name', () => {
    render(<Greet name='Shohan' />);
    const textElement = screen.getByText('Hello, Shohan!');
    expect(textElement).toBeInTheDocument();
  });
});

describe('Test with it', () => {
  it('render correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello, !');
    expect(textElement).toBeInTheDocument();
  });

  xit('render with name', () => {
    render(<Greet name='Shohan' />);
    const textElement = screen.getByText('Hello, Shohan!');
    expect(textElement).toBeInTheDocument();
  });
});
