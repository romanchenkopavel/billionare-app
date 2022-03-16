import { useEffect, useState } from 'react';

import useHover from 'shared/hooks/useHover';

import { ReactComponent as WrongOptionTile } from 'assets/wrong-option-tile.svg';
import { ReactComponent as SelectedOptionTile } from 'assets/selected-option-tile.svg';
import { ReactComponent as HoveredOptionTile } from 'assets/hovered-option-tile.svg';
import { ReactComponent as InactiveOptionTile } from 'assets/inactive-option-tile.svg';
import { ReactComponent as CorrectOptionTile } from 'assets/correct-option-tile.svg';

import TileStates from './constants';

import styles from './tiles.module.css';

interface OptionTileProps {
  label: string;
  state: keyof typeof TileStates;
  option: string;
}

const tileComponents = {
  [TileStates.Inactive]: InactiveOptionTile,
  [TileStates.Correct]: CorrectOptionTile,
  [TileStates.Wrong]: WrongOptionTile,
  [TileStates.Selected]: SelectedOptionTile,
  [TileStates.Hovered]: HoveredOptionTile,
};

function OptionTile({ state, label, option }: OptionTileProps) {
  const [tileState, setTileState] = useState(state);
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  useEffect(() => {
    if (state === TileStates.Inactive && hovered) {
      setTileState(TileStates.Hovered);
    } else {
      setTileState(state);
    }
  }, [hovered, state]);

  const Tile = tileComponents[tileState];

  return (
    <div
      ref={hoverRef}
      data-testid={`tile-${tileState}`}
      className={styles.container}
    >
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.option}>{option}</p>
      </div>

      <Tile />
    </div>
  );
}

export default OptionTile;
