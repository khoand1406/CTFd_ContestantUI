import { KEY_USERINFO } from "@/constants/storage-keys";
import { StorageUtils } from "../utils/storage.utils";
import axios, { type AxiosInstance } from "axios";
import { IUserLoginResponse } from "@/interfaces/auth";
import { deleteCookie } from "@/utils/cookie.utils";

export class Http {
  isAuth: boolean;
  contentType: string;
  instance: AxiosInstance;
  constructor(status: any, contentType: string = "") {
    this.isAuth = status && status.auth ? status.auth : false;
    this.contentType =
      contentType && contentType !== "" ? contentType : "application/json";
    this.instance = axios.create({
      baseURL:
        import.meta.env.APP_ENV === "dev" ? "/" : import.meta.env.APP_API_URL,
    });
  }
  init() {
    deleteCookie("session");

    this.instance.interceptors.request.use(
      (request) => {
        // CTFd automatically contains cookie - we don't want that
        if (!request.data) request.data = {};
        if (this.isAuth) {
          //const tokenInfoStr = StorageUtils.getItem("tokenInfo", "session");

          // For some reason, in order to connect to CTFd current APIs
          // both Authorization Token and Content-Type: application/json must be both enabled
          // which is disabled by default if you don't pass any body data
          //request.headers["Cookie"] = "s";

          const userInfoStr = StorageUtils.getItem(KEY_USERINFO, "local");
          const userInfo = JSON.parse(userInfoStr) as IUserLoginResponse;
          request.headers.authorization = `Token ${userInfo.generatedToken}`;
          request.headers["Content-Type"] = this.contentType;
          request.headers["Is-Contestant"] = true;
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        deleteCookie("session");
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return this.instance;
  }
}
