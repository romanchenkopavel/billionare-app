import { SyntheticEvent, useEffect, useState } from 'react';

import OptionTile from 'shared/tiles/option-tile';

import {
  useCurrenTryStateContext,
  useCurrentTryDispatchContext,
} from 'shared/context/currentTry';
import useCurrentRoundConfig from 'shared/hooks/useCurrentRoundConfig';
import useUpdateOptions from 'shared/hooks/useUpdateOptions';
import { useGameFlowDispatchContext } from 'shared/context';

import { GameSteps } from 'shared/types';
import TileStates from 'shared/tiles/constants';

import styles from './playing.module.css';

function Options() {
  const { options, answers } = useCurrentRoundConfig();
  const [currentOptions, setCurrentOptions] = useState(options);
  const [answersCount, setAnswersCount] = useState(answers.length);

  const { round: currentRound } = useCurrenTryStateContext();
  const setRound = useCurrentTryDispatchContext();

  const setStep = useGameFlowDispatchContext();

  const updateOptions = useUpdateOptions();

  useEffect(() => {
    setAnswersCount(answers.length);
    setCurrentOptions(options);
  }, [options, answers]);

  const handleClick = (e: SyntheticEvent, value: string) => {
    if (answersCount === 1 && answers.includes(value)) {
      setCurrentOptions(
        updateOptions([...currentOptions], [value], TileStates.Correct),
      );

      setTimeout(() => setRound(currentRound + 1), 1000);
    } else if (answersCount !== 1 && answers.includes(value)) {
      setCurrentOptions(
        updateOptions([...currentOptions], [value], TileStates.Correct),
      );

      setAnswersCount((prevCount) => prevCount - 1);
    } else {
      setCurrentOptions(
        updateOptions([...currentOptions], [value], TileStates.Wrong),
      );

      setTimeout(() => setStep(GameSteps.Finish), 1000);
    }

    return undefined;
  };

  return (
    <div className={styles.options}>
      {currentOptions.map(({ label, content, value, state }) => (
        <OptionTile
          state={state || TileStates.Inactive}
          handleClick={(e) => handleClick(e, value)}
          label={label}
          option={content}
        />
      ))}
    </div>
  );
}

export default Options;
