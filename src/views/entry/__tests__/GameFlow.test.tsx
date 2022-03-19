import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import useFormatAmount from 'shared/hooks/useFormatAmount';
import useGameConfig from 'shared/hooks/useGameConfig';
import useMediaQuery from 'shared/hooks/useMediaQuery';
import { GameSteps, GameData } from 'shared/types';

import GameFlow from '../GameFlow';

jest.useFakeTimers();

jest.mock('shared/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('shared/hooks/useGameConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const testQuestionTitle = 'Question 1';
const secondRoundQuestionTitle = 'Question 2';

const secondRound = 2;

describe('GameFlow', () => {
  const mockGameConfig: GameData = {
    rounds: [
      {
        question: testQuestionTitle,
        round: 1,
        answers: ['a'],
        options: [{ label: 'A', content: 'Answer A', value: 'a' }],
      },
      {
        question: secondRoundQuestionTitle,
        round: secondRound,
        answers: ['a'],
        options: [{ label: 'A', content: 'Answer A', value: 'a' }],
      },
    ],
    rewards: [100, 200, 300, 500],
  };
  const state = { step: GameSteps.Playing };
  const setGameStep = jest.fn();

  function Wrapper() {
    return (
      <GameFlowDispatchContext.Provider value={setGameStep}>
        <GameFlowContext.Provider value={state}>
          <GameFlow />
        </GameFlowContext.Provider>
      </GameFlowDispatchContext.Provider>
    );
  }

  beforeEach(() => {
    (useGameConfig as jest.Mock).mockReturnValue(mockGameConfig);
  });

  test('rendering component', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(<Wrapper />);

    expect(screen.getByText(testQuestionTitle)).toBeInTheDocument();
    expect(screen.getAllByTestId('amount')).toHaveLength(
      mockGameConfig.rewards.length,
    );
  });

  test('winning round', () => {
    render(<Wrapper />);

    const tileA = screen.getByTestId('tile-Inactive-A');
    fireEvent.click(tileA);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const formattedAmount = useFormatAmount({
      amount: mockGameConfig.rewards[secondRound],
    });
    expect(screen.getByText(secondRoundQuestionTitle)).toBeInTheDocument();
    expect(
      screen.getAllByTestId('amount-wrapper')[secondRound],
    ).toHaveTextContent(formattedAmount);
  });
});
