import {
  API_CHALLENGE_GET_LIST,
  API_CHALLENGE_GET_TOPICS,
  API_ENV,
} from "@/constants/endpoints";
import { IChallengeListRequest } from "@/interfaces/challenges";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class ChallengeService extends BaseService {
  static async getChallengeTopics() {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + API_CHALLENGE_GET_TOPICS
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getChallengeListOfTopic(req: IChallengeListRequest) {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + `${API_CHALLENGE_GET_LIST}/${req.topic}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
