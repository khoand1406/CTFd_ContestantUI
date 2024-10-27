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

export interface IUserChangePasswordRequest {
  current_password: string;
  new_password: string;
}
