import useGameConfig from './useGameConfig';

function useCurrentRoundConfig() {
  const currentRound = 0;
  const { rounds } = useGameConfig();

  return rounds[currentRound];
}

export default useCurrentRoundConfig;
