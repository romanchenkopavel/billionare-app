/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import { MouseEvent, useEffect, useState } from 'react';

import OptionTile from 'shared/tiles/option-tile';

import {
  useCurrenTryStateContext,
  useCurrentTryDispatchContext,
} from 'shared/context/currentTry';
import { useGameFlowDispatchContext } from 'shared/context';
import useCurrentRoundConfig from 'shared/hooks/useCurrentRoundConfig';
import useUpdateOptions from 'shared/hooks/useUpdateOptions';
import useIsLastRound from 'shared/hooks/useIsLastRound';

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
  const isLastRound = useIsLastRound({ currentRound });

  useEffect(() => {
    setAnswersCount(answers.length);
    setCurrentOptions(options);
  }, [options, answers]);

  const winGame = () => {
    setStep(GameSteps.Finish);
    setRound(currentRound + 1);
  };

  const handleClick = (e: MouseEvent, value: string) => {
    if (answersCount === 1 && answers.includes(value)) {
      setCurrentOptions(
        updateOptions([...currentOptions], [value], TileStates.Correct),
      );

      setTimeout(
        () => (!isLastRound ? setRound(currentRound + 1) : winGame()),
        1000,
      );
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
