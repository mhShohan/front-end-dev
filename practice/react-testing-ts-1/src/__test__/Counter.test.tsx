import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/counter/Counter';

describe('Counter', () => {
  test('render correctly', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incBtn = screen.getByRole('button', { name: 'Increase' });
    expect(incBtn).toBeInTheDocument();
  });

  test('render the count value 0', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('0');
  });

  test('render a count of 1 after clicking the increment button', async () => {
    userEvent.setup();
    render(<Counter />);
    const incBtn = screen.getByRole('button', { name: 'Increase' });
    await userEvent.click(incBtn);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('1');
  });

  test('render a count of 3 after clicking the increment button 3 times', async () => {
    userEvent.setup();
    render(<Counter />);
    const incBtn = screen.getByRole('button', { name: 'Increase' });
    await userEvent.click(incBtn);
    await userEvent.click(incBtn);
    await userEvent.click(incBtn);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('3');
  });
});
