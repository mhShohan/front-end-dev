import { render, screen } from '@testing-library/react';
import Application from '../components/application/Application';

describe('Application', () => {
  test('render correctly', () => {
    render(<Application />);

    // render h1
    const headingOne = screen.getByRole('heading', { level: 1 });
    expect(headingOne).toBeInTheDocument();

    // render h3
    const headingTwo = screen.getByRole('heading', { level: 3 });
    expect(headingTwo).toBeInTheDocument();

    // render input
    const nameElement = screen.getByRole('textbox', { name: 'Name' });
    expect(nameElement).toBeInTheDocument();

    // render input
    const descriptionElement = screen.getByRole('textbox', {
      name: 'Description',
    });
    expect(descriptionElement).toBeInTheDocument();

    const locationElement = screen.getByRole('combobox');
    expect(locationElement).toBeInTheDocument();

    const termsElement = screen.getByRole('checkbox');
    expect(termsElement).toBeInTheDocument();

    // getByLabelText
    const termsElement2 = screen.getByLabelText(
      'Accept terms and conditions!',
      { selector: 'input' }
    );
    expect(termsElement2).toBeInTheDocument();

    //getByPlaceholderText
    const placeholderElement = screen.getByPlaceholderText('Your Name');
    expect(placeholderElement).toBeInTheDocument();

    const submitBtnElement = screen.getByRole('button');
    expect(submitBtnElement).toBeInTheDocument();
  });
});
