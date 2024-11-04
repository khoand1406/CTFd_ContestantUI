import {
  API_CHALLENGE_GET_LIST,
  API_CHALLENGE_GET_TOPICS,
  API_CHALLENGE_START,
  API_CHALLENGE_GET_BY_CATEGORY,
  API_CHALLENGE_ATTEMPT,
  API_ENV,
} from "@/constants/endpoints";
import { IChallengeListRequest, IChallengeStartRequest, IChallengeByCategoryRequest, IChallengeAttemptRequest } from "@/interfaces/challenges";
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

  static async startChallenge(req: IChallengeStartRequest) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_CHALLENGE_START,
        req
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async listChallengesByCategory(req: IChallengeByCategoryRequest) {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + `${API_CHALLENGE_GET_BY_CATEGORY}/${req.category}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async submitChallengeFlag(req: IChallengeAttemptRequest) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_CHALLENGE_ATTEMPT,
        req
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}