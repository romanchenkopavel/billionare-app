import { useCallback, useMemo, useState } from 'react';

import WelcomeScreen from 'views/welcome-screen/components';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import { GameFlowParams, GameSteps } from 'shared/types';

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
        <WelcomeScreen />
      </GameFlowDispatchContext.Provider>
    </GameFlowContext.Provider>
  );
}

export default App;
