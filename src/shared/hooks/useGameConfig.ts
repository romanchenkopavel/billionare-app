import { useState } from 'react';
import { GameData } from 'shared/types';

import data from '../../gameConfig.json';

export default function useGameConfig() {
  const [{ rewards, rounds }] = useState<GameData>(data);

  return { rewards, rounds };
}
