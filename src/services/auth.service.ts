import {
  API_ENV,
  API_USER_CHANGE_PASSWORD,
  API_USER_LOG_IN,
  REGISTER_CONTESTANT,
} from "@/constants/endpoints";
import {
  IUserChangePasswordRequest,
  IUserLoginRequest,
  IUserRegisterRequest,
} from "@/interfaces/auth";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class AuthService extends BaseService {
  static async login(data: IUserLoginRequest) {
    try {
      const response = await this.request({ auth: false }).post(
        API_ENV.MAIN + API_USER_LOG_IN,
        data
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async changePassword(data: IUserChangePasswordRequest) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_USER_CHANGE_PASSWORD,
        data
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
  static async register(data:IUserRegisterRequest){
    try{
      const response= await this.request({auth:false}).post(
        API_ENV.MAIN+ REGISTER_CONTESTANT,
        data
      );
      return response;
    }catch(error){
      return (error as AxiosError).response;
    }
  }
}
