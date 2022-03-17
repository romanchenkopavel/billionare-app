import { ReactNode, useState, useCallback, useMemo } from 'react';

import { useGameFlowContext } from 'shared/context';
import {
  CurrentyTryDispatchContext,
  CurrentyTryStateContext,
} from 'shared/context/currentTry';
import useControlGameFlow from 'shared/hooks/useControlGameFlow';
import { GameSteps, CurrentTryState, CurrentTryDispatch } from 'shared/types';

import GameOver from 'views/game-over';
import Playing from 'views/playing';
import Welcome from 'views/welcome';

const StepComponents = new Map<keyof typeof GameSteps, ReactNode>([
  [GameSteps.Start, <Welcome />],
  [GameSteps.Playing, <Playing />],
  [GameSteps.Finish, <GameOver />],
]);

function GameFlow(): JSX.Element {
  const { step } = useGameFlowContext();
  const [currentTryState, setCurrentTryState] = useState<CurrentTryState>({
    round: 0,
  });

  const stateValue = useMemo(() => currentTryState, [currentTryState]);
  const dispatchValue = useCallback(
    (round: number) => {
      setCurrentTryState({ round });
    },
    [setCurrentTryState],
  );

  useControlGameFlow({ currentRound: currentTryState.round });

  return (
    <CurrentyTryStateContext.Provider value={stateValue}>
      <CurrentyTryDispatchContext.Provider value={dispatchValue}>
        {StepComponents.get(step)}
      </CurrentyTryDispatchContext.Provider>
    </CurrentyTryStateContext.Provider>
  );
}

export default GameFlow;
