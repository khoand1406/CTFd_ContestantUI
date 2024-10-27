export interface IChallenge {
  id: number;
  name: string;
  category: string;
  message: string;
  connectionInfo: string;
  value: number;
  maxAttempts: number;
  isDeployed: boolean;
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
