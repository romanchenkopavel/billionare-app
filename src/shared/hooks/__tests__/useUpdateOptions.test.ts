import TileStates from 'shared/tiles/constants';
import useUpdateOptions from '../useUpdateOptions';

const options = [
  { label: 'A', content: 'answer A', value: 'a' },
  { label: 'B', content: 'answer B', value: 'b' },
  { label: 'C', content: 'answer C', value: 'c' },
];

const candidate = 'a';

describe('useUpdateOptions', () => {
  test('returning callback to update options', () => {
    const updateOptions = useUpdateOptions();

    const updated = updateOptions(options, [candidate], TileStates.Correct);
    expect(updated.find((option) => option.value === candidate)?.state).toBe(
      TileStates.Correct,
    );
  });
});
