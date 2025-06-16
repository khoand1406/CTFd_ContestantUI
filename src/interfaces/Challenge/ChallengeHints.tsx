interface Hint {
  id: number;
  cost: number;
}

export interface ChallengeHintsProps {
  hints: Hint[];
  onUnlocked: (hintId: number) => void;
}