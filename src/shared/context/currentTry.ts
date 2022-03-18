import { createContext, useContext } from 'react';

import { CurrentTryDispatch, CurrentTryState } from 'shared/types';

const CurrentyTryStateContext = createContext<CurrentTryState | undefined>(
  undefined,
);
const CurrentyTryDispatchContext = createContext<
  CurrentTryDispatch | undefined
>(undefined);

const useCurrenTryStateContext = () => {
  const context = useContext(CurrentyTryStateContext);

  if (context === undefined) {
    throw new Error(
      'useCurrenTryStateContext must be used within a CurrentyTryStateContext provider',
    );
  }
  return context;
};

const useCurrentTryDispatchContext = () => {
  const context = useContext(CurrentyTryDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useCurrentTryDispatchContext must be used within a CurrentyTryDispatchContext',
    );
  }

  return context;
};

export {
  CurrentyTryDispatchContext,
  CurrentyTryStateContext,
  useCurrenTryStateContext,
  useCurrentTryDispatchContext,
};
