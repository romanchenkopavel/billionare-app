import { useEffect } from 'react';

import useCurrentRoundConfig from 'shared/hooks/useCurrentRoundConfig';
import useGameLength from 'shared/hooks/useGameLength';

import { useGameFlowDispatchContext } from 'shared/context';
import { useCurrenTryStateContext } from 'shared/context/currentTry';

import { GameSteps } from 'shared/types';

import Options from './options';
import Rewards from './rewards';

import styles from './playing.module.css';

function Playing() {
  const { question } = useCurrentRoundConfig();

  return (
    <div className={styles.container}>
      <div className={styles.qaSection}>
        <span className={styles.question}>{question}</span>
        <Options />
      </div>
      <Rewards />
    </div>
  );
}

export default Playing;
