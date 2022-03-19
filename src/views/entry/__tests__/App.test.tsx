import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';

jest.mock('views/playing', () => ({
  __esModule: true,
  default: () => <div>Playing</div>,
}));

describe('App', () => {
  test('rendering component', () => {
    render(<App />);
    const linkElement = screen.getByText('Who wants to be a millionaire?');

    expect(linkElement).toBeInTheDocument();
  });

  test('changing game step', () => {
    render(<App />);

    const startGameButton = screen.getByText('Start');
    fireEvent.click(startGameButton);

    expect(screen.getByText('Playing')).toBeInTheDocument();
  });
});
