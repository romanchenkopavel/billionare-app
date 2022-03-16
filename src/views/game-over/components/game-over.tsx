import handLogo from 'assets/hand.png';

import Button from 'shared/button';
import { useGameFlowDispatchContext } from 'shared/context';
import { GameSteps } from 'shared/types';

import styles from './game-over.module.css';

function GameOver() {
  const setGameStep = useGameFlowDispatchContext();

  const handleClick = () => {
    setGameStep(GameSteps.Start);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.logo} src={handLogo} alt="thumbs up" />
        <div className={styles.rewardContent}>
          <span className={styles.totalScore}>Total score:</span>
          <span className={styles.earned}>$8,000 earned</span>
          <Button onClick={handleClick} content="Try again" />
        </div>
      </div>
    </div>
  );
}

export default GameOver;
