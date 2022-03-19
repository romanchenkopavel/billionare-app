import Drawer from 'shared/drawer';
import RewardTile, { RewardTileState } from 'shared/tiles/reward-tile';

import useGameConfig from 'shared/hooks/useGameConfig';
import { useCurrenTryStateContext } from 'shared/context/currentTry';

import styles from './playing.module.css';

const getRewardState = (idx: number, currentRound: number) => {
  if (idx < currentRound) {
    return RewardTileState.Earned;
  }

  if (idx === currentRound) {
    return RewardTileState.Current;
  }

  return RewardTileState.Available;
};

function Rewards() {
  const { rewards } = useGameConfig();
  const { round: currentRound } = useCurrenTryStateContext();

  return (
    <Drawer>
      <div className={styles.rewards}>
        {rewards.map((reward, idx) => {
          const tileState = getRewardState(idx, currentRound);

          return (
            <RewardTile
              key={`${tileState}-${reward}`}
              amount={reward}
              state={tileState}
            />
          );
        })}
      </div>
    </Drawer>
  );
}

export default Rewards;
