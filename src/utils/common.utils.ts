import { jwtDecode } from "jwt-decode";
import { StorageUtils } from "@/utils/storage.utils";
// import type { ITokenInfo } from "../interfaces/Account";
// import type { ITokenPayload } from "../interfaces/JWT";

export class CommonUtils {
  // static getUserEmail(): string | null {
  //   try {
  //     const tokenInfoStr = StorageUtils.getItem("tokenInfo", "session");
  //     console.log(tokenInfoStr);
  //     const tokenInfo = JSON.parse(tokenInfoStr) as ITokenInfo;
  //     console.log(tokenInfo);
  //     console.log(tokenInfo.accessToken);
  //     const decodedAccessInfo = jwtDecode<ITokenPayload>(tokenInfo.accessToken);
  //     console.log(decodedAccessInfo);
  //     return decodedAccessInfo.sub;
  //   } catch (e) {
  //     return null;
  //   }
  // }
  static isLoggedIn() {
    const token = StorageUtils.getItem("userInfo", "local") as string;
    console.log(token);
    return token ? true : false;
  }
}
