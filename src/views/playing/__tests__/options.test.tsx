import { fireEvent, render, screen } from '@testing-library/react';

import { GameFlowContext, GameFlowDispatchContext } from 'shared/context';
import {
  CurrentyTryDispatchContext,
  CurrentyTryStateContext,
} from 'shared/context/currentTry';
import useGameConfig from 'shared/hooks/useGameConfig';
import useIsLastRound from 'shared/hooks/useIsLastRound';
import useMediaQuery from 'shared/hooks/useMediaQuery';

import {
  CurrentTryState,
  GameData,
  GameFlowParams,
  GameSteps,
} from 'shared/types';

import Options from '../components/options';

jest.useFakeTimers();

jest.mock('shared/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('shared/hooks/useGameConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('shared/hooks/useIsLastRound', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockConfig: GameData = {
  rewards: [10, 200, 500, 1000, 2000, 5000],
  rounds: [
    {
      question: 'Question 1',
      round: 1,
      answers: ['a'],
      options: [
        { label: 'A', content: 'Answer A', value: 'a' },
        { label: 'B', content: 'Answer B', value: 'b' },
      ],
    },
    {
      question: 'Question 2',
      round: 2,
      answers: ['b'],
      options: [
        { label: 'A', content: 'Answer A', value: 'a' },
        { label: 'B', content: 'Answer B', value: 'b' },
      ],
    },
    {
      question: 'Question 3',
      round: 3,
      answers: ['b', 'c'],
      options: [
        { label: 'A', content: 'Answer A', value: 'a' },
        { label: 'B', content: 'Answer B', value: 'b' },
        { label: 'C', content: 'Answer C', value: 'c' },
      ],
    },
  ],
};

describe('Options', () => {
  const currentRound = 1;
  const gameFlowStateMock = { step: GameSteps.Playing };
  const currentTryStateMock = { round: currentRound };
  const setGameStep = jest.fn();
  const setRound = jest.fn();

  function Wrapper({
    gameFlowState,
    currentTryState,
  }: {
    gameFlowState?: GameFlowParams;
    currentTryState?: CurrentTryState;
  }) {
    return (
      <GameFlowDispatchContext.Provider value={setGameStep}>
        <GameFlowContext.Provider value={gameFlowState}>
          <CurrentyTryDispatchContext.Provider value={setRound}>
            <CurrentyTryStateContext.Provider value={currentTryState}>
              <Options />
            </CurrentyTryStateContext.Provider>
          </CurrentyTryDispatchContext.Provider>
        </GameFlowContext.Provider>
      </GameFlowDispatchContext.Provider>
    );
  }

  Wrapper.defaultProps = {
    gameFlowState: gameFlowStateMock,
    currentTryState: currentTryStateMock,
  };

  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    (useGameConfig as jest.Mock).mockReturnValue(mockConfig);
    (useIsLastRound as jest.Mock).mockReturnValue(false);
  });

  test('rendering component', () => {
    render(<Wrapper />);

    expect(
      screen.getByText(mockConfig.rounds[currentRound].options[0].label),
    ).toBeInTheDocument();
  });

  test('handling correct option click', () => {
    render(<Wrapper />);

    const correctOption = screen.getByTestId('tile-Inactive-B');
    fireEvent.click(correctOption);

    expect(screen.getByTestId('tile-Correct-B')).toBeInTheDocument();
  });

  test('handling last round', () => {
    (useIsLastRound as jest.Mock).mockReturnValue(true);

    render(<Wrapper />);

    const correctOption = screen.getByTestId('tile-Inactive-B');
    fireEvent.click(correctOption);

    jest.advanceTimersByTime(1000);

    expect(setGameStep).toHaveBeenCalledWith(GameSteps.Finish);
    expect(setRound).toHaveBeenCalledWith(currentRound + 1);
  });

  test('handling wrong option click', () => {
    render(<Wrapper />);

    const wrongOption = screen.getByTestId('tile-Inactive-A');
    fireEvent.click(wrongOption);

    jest.advanceTimersByTime(1000);

    expect(screen.getByTestId('tile-Wrong-A')).toBeInTheDocument();
    expect(setGameStep).toHaveBeenCalledWith(GameSteps.Finish);
  });

  test('handling several correct answers', () => {
    render(<Wrapper currentTryState={{ round: 2 }} />);

    const firstCorrectOption = screen.getByTestId('tile-Inactive-C');
    const secondCorrectOption = screen.getByTestId('tile-Inactive-B');

    fireEvent.click(firstCorrectOption);
    fireEvent.click(secondCorrectOption);

    expect(screen.queryByTestId('tile-Inactive-C')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tile-Inactive-B')).not.toBeInTheDocument();

    expect(screen.getByTestId('tile-Correct-B')).toBeInTheDocument();
    expect(screen.getByTestId('tile-Correct-C')).toBeInTheDocument();
  });
});
