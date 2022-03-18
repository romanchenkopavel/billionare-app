import { useCurrenTryStateContext } from 'shared/context/currentTry';
import useGameConfig from './useGameConfig';

function useCurrentRoundConfig() {
  const { round: currentRound } = useCurrenTryStateContext();
  const { rounds } = useGameConfig();

  return rounds[currentRound];
}

export default useCurrentRoundConfig;
