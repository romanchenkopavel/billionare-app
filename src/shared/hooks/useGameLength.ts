import useGameConfig from './useGameConfig';

function useGameLength() {
  const { rounds } = useGameConfig();

  return rounds.length;
}

export default useGameLength;
