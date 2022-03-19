import useGameConfig from '../useGameConfig';

const mockData = { rewards: [], rounds: [] };

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => [mockData, () => {}],
}));

describe('useGameConfig', () => {
  test('handling state', () => {
    const gameConfig = useGameConfig();

    expect(gameConfig).toEqual(mockData);
  });
});
