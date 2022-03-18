import { useCallback } from 'react';
import { Rewards } from 'shared/types';

function useUpdateRewards() {
  return useCallback((rewards: Rewards, round: number) => {
    let acc: number[];

    return rewards.map((_, idx) => {
      if (idx === round) {
        acc = [idx - 1, idx, idx + 1];
      }

      return acc;
    });
  }, []);
}

export default useUpdateRewards;
