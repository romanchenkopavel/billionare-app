import { useCurrenTryStateContext } from 'shared/context/currentTry';
import useCurrentRoundConfig from '../useCurrentRoundConfig';
import useGameConfig from '../useGameConfig';

jest.mock('../useGameConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('shared/context/currentTry', () => ({
  __esModule: true,
  useCurrenTryStateContext: jest.fn(),
}));

describe('useCurrentRoundConfig', () => {
  const mockData = {
    rounds: [{ round: 0 }, { round: 1 }, { round: 2 }],
  };

  const currentRound = 2;

  test('calling hook', () => {
    (useGameConfig as jest.Mock).mockReturnValue(mockData);
    (useCurrenTryStateContext as jest.Mock).mockReturnValue({
      round: currentRound,
    });

    expect(useCurrentRoundConfig()).toStrictEqual({ round: 2 });
  });
});
