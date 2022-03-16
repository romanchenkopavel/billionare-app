import { render, fireEvent, screen } from '@testing-library/react';

import TileStates from '../constants';
import OptionTile from '../option-tile';

describe('OptionTile', () => {
  test('rendering component', () => {
    render(
      <OptionTile label="A" state={TileStates.Correct} option="Answer 1" />,
    );

    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('handling hover state mouseenter', () => {
    render(
      <OptionTile label="B" state={TileStates.Inactive} option="Answer 2" />,
    );

    const tile = screen.getByTestId('tile-Inactive');

    fireEvent.mouseEnter(tile);

    expect(screen.getByTestId('tile-Hovered')).toBeInTheDocument();
    expect(screen.queryByTestId('tile-Inactive')).not.toBeInTheDocument();
  });

  test('handling hover state mouseleave', () => {
    render(
      <OptionTile label="B" state={TileStates.Inactive} option="Answer 2" />,
    );

    const tile = screen.getByTestId('tile-Inactive');

    fireEvent.mouseEnter(tile);
    fireEvent.mouseLeave(tile);

    expect(screen.getByTestId('tile-Inactive')).toBeInTheDocument();
    expect(screen.queryByTestId('tile-Hovered')).not.toBeInTheDocument();
  });
});
