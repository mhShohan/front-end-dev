import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountByValue from '../components/counter/CountByValue';

describe('CountByValue', () => {
  test('render a count of 10 after clicking the set button', async () => {
    userEvent.setup();
    render(<CountByValue />);
    const amountInput = screen.getByRole('spinbutton');
    await userEvent.type(amountInput, '10');
    expect(amountInput).toHaveValue(10);
    const setBtn = screen.getByRole('button', { name: 'Set' });
    await userEvent.click(setBtn);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('10');
  });

  test('element are focused in right order', async () => {
    userEvent.setup();
    render(<CountByValue />);
    const amountInput = screen.getByRole('spinbutton');
    const setBtn = screen.getByRole('button', { name: 'Set' });
    await userEvent.tab();
    expect(amountInput).toHaveFocus();
    await userEvent.tab();
    expect(setBtn).toHaveFocus();
  });
});
