import { useEffect, useState } from 'react';

import useHover from 'shared/hooks/useHover';
import useMediaQuery from 'shared/hooks/useMediaQuery';

import { ReactComponent as WrongOptionTile } from 'assets/wrong-option-tile.svg';
import { ReactComponent as SelectedOptionTile } from 'assets/selected-option-tile.svg';
import { ReactComponent as HoveredOptionTile } from 'assets/hovered-option-tile.svg';
import { ReactComponent as InactiveOptionTile } from 'assets/inactive-option-tile.svg';
import { ReactComponent as CorrectOptionTile } from 'assets/correct-option-tile.svg';

import { ReactComponent as WrongOptionTileMobile } from 'assets/wrong-option-mobile.svg';
import { ReactComponent as SelectedOptionTileMobile } from 'assets/selected-option-mobile.svg';
import { ReactComponent as InactiveOptionTileMobile } from 'assets/inactive-option-mobile.svg';
import { ReactComponent as CorrectOptionTileMobile } from 'assets/correct-option-mobile.svg';

import { EventHandlers } from 'shared/types';
import TileStates from './constants';

import styles from './tiles.module.css';

interface OptionTileProps {
  label: string;
  state: keyof typeof TileStates;
  option: string;
  handleClick: EventHandlers.Click<HTMLDivElement>;
}

const mobileTiles = {
  [TileStates.Inactive]: InactiveOptionTileMobile,
  [TileStates.Correct]: CorrectOptionTileMobile,
  [TileStates.Wrong]: WrongOptionTileMobile,
  [TileStates.Selected]: SelectedOptionTileMobile,
  [TileStates.Hovered]: InactiveOptionTileMobile,
};

const tiles = {
  [TileStates.Inactive]: InactiveOptionTile,
  [TileStates.Correct]: CorrectOptionTile,
  [TileStates.Wrong]: WrongOptionTile,
  [TileStates.Selected]: SelectedOptionTile,
  [TileStates.Hovered]: HoveredOptionTile,
};

const SpaceBarKey = ' ';

function OptionTile({ state, label, option, handleClick }: OptionTileProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [tileState, setTileState] = useState(state);
  const [hoverRef, hovered] = useHover<HTMLDivElement>();

  const tileComponents = isMobile ? mobileTiles : tiles;

  useEffect(() => {
    if (state === TileStates.Inactive && hovered) {
      setTileState(TileStates.Hovered);
    } else {
      setTileState(state);
    }
  }, [hovered, state]);

  const Tile = tileComponents[tileState];

  const handleKeyDown: EventHandlers.KeyDown<HTMLDivElement> = (event) => {
    if (event.key === SpaceBarKey) {
      // eslint-disable-next-line no-console
      console.log(event.timeStamp);
    }
  };

  return (
    <div
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
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
