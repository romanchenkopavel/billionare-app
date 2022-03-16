import { useCallback, useMemo, useState } from 'react';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import { GameFlowParams, GameSteps } from 'shared/types';

import GameFlow from './GameFlow';

function App() {
  const [gameState, setGameStep] = useState<GameFlowParams>({
    step: GameSteps.Start,
  });

  const value = useMemo(() => gameState, [gameState]);
  const dispatchGameStep = useCallback(
    (step: keyof typeof GameSteps) => {
      setGameStep({ step });
    },
    [setGameStep],
  );

  return (
    <GameFlowContext.Provider value={value}>
      <GameFlowDispatchContext.Provider value={dispatchGameStep}>
        <GameFlow />
      </GameFlowDispatchContext.Provider>
    </GameFlowContext.Provider>
  );
}

export default App;
