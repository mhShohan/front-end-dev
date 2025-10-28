import { render, screen } from '@testing-library/react';
import Users from '../components/user/Users';

describe('Users', () => {
  test('render correctly', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
  });
});
