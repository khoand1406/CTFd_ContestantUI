export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  generatedToken: string;
  user: {
    id: number;
    team: number;
    email: string;
    username: string;
  };
}
