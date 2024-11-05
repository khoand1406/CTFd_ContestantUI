export interface IChallenge {
  id: number;
  name: string;
  category: string;
  description: string;
  max_attempts: number;
  next_id: number | null;
  requirements: string | null;
  state: string;
  time_limit: number | null;
  type: string;
  value: number;
  require_deploy: number;
}

export interface IMultipleChoiceChallenge extends IChallenge {
  choices: Array<string>;
}

export interface IDynamicChallenge extends IChallenge {
  decay: number;
}

export interface IChallengeTopicsResponse {
  data: Array<IChallenge>;
}

export interface IChallengeListRequest {
  topic: string;
}

export interface IChallengeListResponse {
  data: Array<IChallenge>;
}

export interface IChallengeStartRequest {
  challenge_id: number,
  generatedToken: string

}

export interface IChallengeByCategoryRequest {
  category: string;
}

export interface IChallengeAttemptRequest {
  challenge_id: number;
  submission: string;
}

