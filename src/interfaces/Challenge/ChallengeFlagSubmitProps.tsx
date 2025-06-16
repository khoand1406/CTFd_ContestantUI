export interface ChallengeSubmitProps {
  challengeId: number;
  maxAttempts: number;
  attempts: number;
  isSubmitted: boolean;
  requireDeploy: boolean;
  isChallengeStarted: boolean;
  onSubmitSuccess: () => void;
}