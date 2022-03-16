import { render, screen, fireEvent } from '@testing-library/react';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import { GameSteps } from 'shared/types';

import GameOver from '..';

describe('GameOver', () => {
  const setStep = jest.fn();

  const wrapper = () => (
    <GameFlowContext.Provider value={undefined}>
      <GameFlowDispatchContext.Provider value={setStep}>
        <GameOver />
      </GameFlowDispatchContext.Provider>
    </GameFlowContext.Provider>
  );

  test('rendering component', () => {
    render(wrapper());

    expect(screen.getByText('Total score:')).toBeInTheDocument();
  });

  test('handling try again click', () => {
    render(wrapper());

    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);

    expect(setStep).toHaveBeenCalledWith(GameSteps.Start);
  });
});
