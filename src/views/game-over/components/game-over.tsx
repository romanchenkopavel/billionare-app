/* eslint-disable react/jsx-one-expression-per-line */
import handLogo from 'assets/hand.png';

import Button from 'shared/button';

import { useGameFlowDispatchContext } from 'shared/context';
import { useCurrenTryStateContext } from 'shared/context/currentTry';
import useFormatAmount from 'shared/hooks/useFormatAmount';
import useGameConfig from 'shared/hooks/useGameConfig';

import { GameSteps } from 'shared/types';

import styles from './game-over.module.css';

function GameOver() {
  const setGameStep = useGameFlowDispatchContext();

  const { round: currentRound } = useCurrenTryStateContext();
  const { rewards } = useGameConfig();

  const handleClick = () => {
    setGameStep(GameSteps.Start);
  };

  const earnedAmount = useFormatAmount({ amount: rewards[currentRound] });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.logo} src={handLogo} alt="thumbs up" />
        <div className={styles.rewardContent}>
          <span className={styles.totalScore}>Total score:</span>
          <span className={styles.earned}>{earnedAmount} earned</span>
          <Button onClick={handleClick} content="Try again" />
        </div>
      </div>
    </div>
  );
}

export default GameOver;
