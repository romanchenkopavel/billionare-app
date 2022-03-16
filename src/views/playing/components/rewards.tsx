import Drawer from 'shared/drawer';
import RewardTile from 'shared/tiles/reward-tile';

import useGameConfig from 'shared/hooks/useGameConfig';

import styles from './playing.module.css';

function Rewards() {
  const { rewards } = useGameConfig();

  return (
    <Drawer>
      <div className={styles.rewards}>
        {[...rewards].reverse().map((reward) => (
          <RewardTile amount={reward} state="Available" />
        ))}
      </div>
    </Drawer>
  );
}

export default Rewards;
