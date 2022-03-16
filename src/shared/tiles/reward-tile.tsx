import { ReactComponent as AvailableRewardTile } from 'assets/available-reward-tile.svg';
import { ReactComponent as EarnedRewardTile } from 'assets/earned-reward-tile.svg';
import { ReactComponent as CurrentRewardTile } from 'assets/current-reward-tile.svg';

import useFormatAmount from 'shared/hooks/useFormatAmount';

import styles from './tiles.module.css';

enum RewardTileState {
  Earned = 'Earned',
  Available = 'Available',
  Current = 'Current',
}

interface RewardTileProps {
  amount: number;
  state: keyof typeof RewardTileState;
}

const TileComponents = {
  [RewardTileState.Earned]: EarnedRewardTile,
  [RewardTileState.Available]: AvailableRewardTile,
  [RewardTileState.Current]: CurrentRewardTile,
};

function RewardTile({ amount, state }: RewardTileProps) {
  const formattedAmount = useFormatAmount({ amount });

  const Tile = TileComponents[state];

  return (
    <div className={styles.rewardTile}>
      <span className={styles.amount}>{formattedAmount}</span>
      <Tile />
    </div>
  );
}

export default RewardTile;
