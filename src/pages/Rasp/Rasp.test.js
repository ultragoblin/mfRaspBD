import { render, screen } from '@testing-library/react';
import Rasp from './Rasp';

test('renders learn react link', () => {
  render(<Rasp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
