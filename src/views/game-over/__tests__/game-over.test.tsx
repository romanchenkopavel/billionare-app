import { render, screen, fireEvent } from '@testing-library/react';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import {
  CurrentyTryDispatchContext,
  CurrentyTryStateContext,
} from 'shared/context/currentTry';
import { GameSteps } from 'shared/types';

import GameOver from '..';

describe('GameOver', () => {
  const setStep = jest.fn();
  const setRound = jest.fn();

  const gameFlowState = { step: GameSteps.Finish };
  const currentTryState = { round: 3 };

  function Wrapper() {
    return (
      <GameFlowContext.Provider value={gameFlowState}>
        <GameFlowDispatchContext.Provider value={setStep}>
          <CurrentyTryStateContext.Provider value={currentTryState}>
            <CurrentyTryDispatchContext.Provider value={setRound}>
              <GameOver />
            </CurrentyTryDispatchContext.Provider>
          </CurrentyTryStateContext.Provider>
        </GameFlowDispatchContext.Provider>
      </GameFlowContext.Provider>
    );
  }

  test('rendering component', () => {
    render(<Wrapper />);

    expect(screen.getByText('Total score:')).toBeInTheDocument();
  });

  test('handling try again click', () => {
    render(<Wrapper />);

    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);

    expect(setStep).toHaveBeenCalledWith(GameSteps.Start);
    expect(setRound).toHaveBeenCalledWith(0);
  });
});
