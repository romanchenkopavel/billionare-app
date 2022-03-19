/* eslint-disable no-console */
import { render, fireEvent, screen } from '@testing-library/react';
import useMediaQuery from 'shared/hooks/useMediaQuery';

import TileStates from '../constants';
import OptionTile from '../option-tile';

jest.mock('shared/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('OptionTile', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('rendering component', () => {
    render(
      <OptionTile
        handleClick={handleClick}
        label="A"
        state={TileStates.Correct}
        option="Answer 1"
      />,
    );

    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('handling hover state mouseenter', () => {
    render(
      <OptionTile
        handleClick={handleClick}
        label="B"
        state={TileStates.Inactive}
        option="Answer 2"
      />,
    );

    const tile = screen.getByTestId('tile-Inactive-B');

    fireEvent.mouseEnter(tile);

    expect(screen.getByTestId('tile-Hovered-B')).toBeInTheDocument();
    expect(screen.queryByTestId('tile-Inactive-B')).not.toBeInTheDocument();
  });

  test('handling hover state mouseleave', () => {
    render(
      <OptionTile
        handleClick={handleClick}
        label="B"
        state={TileStates.Inactive}
        option="Answer 2"
      />,
    );

    const tile = screen.getByTestId('tile-Inactive-B');

    fireEvent.mouseEnter(tile);
    fireEvent.mouseLeave(tile);

    expect(screen.getByTestId('tile-Inactive-B')).toBeInTheDocument();
    expect(screen.queryByTestId('tile-Hovered-B')).not.toBeInTheDocument();
  });

  test('handling key press', () => {
    console.log = jest.fn();

    render(
      <OptionTile
        handleClick={handleClick}
        label="A"
        state={TileStates.Inactive}
        option="Answer 1"
      />,
    );

    const tile = screen.getByTestId('tile-Inactive-A');
    fireEvent.keyDown(tile, { key: ' ' });

    expect(console.log).toHaveBeenCalledWith('keydown');
  });
});
