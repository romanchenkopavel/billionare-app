import useGameLength from './useGameLength';

function useIsLastRound({ currentRound }: { currentRound: number }) {
  const gameLength = useGameLength();

  if (gameLength === currentRound + 1) {
    return true;
  }

  return false;
}

export default useIsLastRound;
