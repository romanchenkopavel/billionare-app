import cn from 'classnames';

import { ReactComponent as AvailableRewardTile } from 'assets/available-reward-tile.svg';
import { ReactComponent as CurrentRewardTile } from 'assets/current-reward-tile.svg';

import useFormatAmount from 'shared/hooks/useFormatAmount';

import styles from './tiles.module.css';

export enum RewardTileState {
  Earned = 'Earned',
  Available = 'Available',
  Current = 'Current',
}

interface RewardTileProps {
  amount: number;
  state: keyof typeof RewardTileState;
}

const TileComponents = {
  [RewardTileState.Available]: <AvailableRewardTile />,
  [RewardTileState.Current]: <CurrentRewardTile />,
};

function RewardTile({ amount, state }: RewardTileProps) {
  const formattedAmount = useFormatAmount({ amount });

  const renderTile = () => {
    if (state !== RewardTileState.Earned) {
      return TileComponents[state];
    }

    return TileComponents[RewardTileState.Available];
  };

  const isEarned = state === RewardTileState.Earned;
  const isCurrent = state === RewardTileState.Current;

  return (
    <div
      className={cn(styles.rewardTile, {
        [styles.earned]: isEarned,
        [styles.current]: isCurrent,
      })}
    >
      <span className={styles.amount}>{formattedAmount}</span>
      {renderTile()}
    </div>
  );
}

export default RewardTile;
