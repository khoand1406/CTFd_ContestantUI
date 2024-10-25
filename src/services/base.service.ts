import { Http } from "@/services/http.service";

export class BaseService {
  static request(status = { auth: false }) {
    return new Http(status).init();
  }
}
