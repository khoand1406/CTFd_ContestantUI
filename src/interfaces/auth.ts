export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  generatedToken: string;
}
