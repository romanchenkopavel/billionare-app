import { useCallback } from 'react';
import TileStates from 'shared/tiles/constants';
import { Option } from 'shared/types';

function useUpdateOptions() {
  function updateOptions(
    options: Option[],
    values: string[],
    state: keyof typeof TileStates,
  ) {
    return options.map((option) => {
      if (values.includes(option.value)) {
        return { ...option, state };
      }

      return option;
    });
  }

  return useCallback(updateOptions, []);
}

export default useUpdateOptions;
