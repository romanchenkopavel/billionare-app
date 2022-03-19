import useGameConfig from '../useGameConfig';
import useGameLength from '../useGameLength';

jest.mock('../useGameConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useGameLength', () => {
  beforeEach(() => {
    const mockGameLength = 3;

    const gameConfig = {
      rounds: Array.from({ length: mockGameLength }, (v, i) => i),
    };

    (useGameConfig as jest.Mock).mockReturnValue(gameConfig);
  });
  test('calling hook', () => {
    const gameLength = useGameLength();

    expect(gameLength).toEqual(3);
  });
});
