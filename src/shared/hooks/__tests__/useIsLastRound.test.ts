import useGameLength from '../useGameLength';
import useIsLastRound from '../useIsLastRound';

jest.mock('../useGameLength', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useIsLastRound', () => {
  beforeEach(() => {
    (useGameLength as jest.Mock).mockReturnValue(10);
  });
  test('current round is last', () => {
    expect(useIsLastRound({ currentRound: 9 })).toBe(true);
  });

  test('current round is not last', () => {
    expect(useIsLastRound({ currentRound: 8 })).toBe(false);
  });
});
