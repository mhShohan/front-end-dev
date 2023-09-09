import { render, screen } from '@testing-library/react';
import Skills from '../components/skills/Skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JS'];

  test('render ul correctly', () => {
    render(<Skills skills={skills} />);

    const ulElement = screen.getByRole('list');
    expect(ulElement).toBeInTheDocument();
  });

  test('render li correctly', () => {
    render(<Skills skills={skills} />);

    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(skills.length);
  });

  test('render login button', () => {
    render(<Skills skills={skills} />);

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    expect(loginBtn).toBeInTheDocument();
  });

  test('start learning button is not rendered', () => {
    render(<Skills skills={skills} />);

    const startLearningBtn = screen.queryByRole('button', {
      name: 'Start Learning',
    });
    expect(startLearningBtn).not.toBeInTheDocument();
  });
});
