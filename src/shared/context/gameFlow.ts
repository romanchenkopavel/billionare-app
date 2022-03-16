import { createContext, useContext } from 'react';

import { GameFlowDispatchParams, GameFlowParams } from 'shared/types';

const GameFlowContext = createContext<GameFlowParams>(undefined);
const GameFlowDispatchContext = createContext<
  GameFlowDispatchParams | undefined
>(undefined);

const useGameFlowContext = () => {
  const context = useContext(GameFlowContext);

  if (context === undefined) {
    throw new Error(
      'useGameFlowContext must be used within a GameFlowContext provider',
    );
  }
  return context;
};

const useGameFlowDispatchContext = () => {
  const context = useContext(GameFlowDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useGameFlowDispatchContext must be used within a GameFlowDispatchContext',
    );
  }

  return context;
};

export {
  GameFlowContext,
  GameFlowDispatchContext,
  useGameFlowContext,
  useGameFlowDispatchContext,
};
