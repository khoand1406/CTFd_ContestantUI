import {
  API_CHALLENGE_ATTEMPT,
  API_CHALLENGE_DETAILS,
  API_CHALLENGE_GET_BY_CATEGORY,
  API_CHALLENGE_GET_LIST,
  API_CHALLENGE_GET_TOPICS,
  API_CHALLENGE_LIST_TOPIC,
  API_CHALLENGE_START,
  API_ENV,
} from "@/constants/endpoints";
import { IChallengeAttemptRequest, IChallengeByCategoryRequest, IChallengeListRequest, IChallengeStartRequest } from "@/interfaces/challenges";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";



export class ChallengeService extends BaseService {
  static async submitFlag(challenge_id: number | undefined, submission: string) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_CHALLENGE_ATTEMPT,
        {
          challenge_id,
          submission,
        }
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getChallengeDetails(id: number | undefined) {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + `${API_CHALLENGE_DETAILS}/${id}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
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

  static async getListOfTopic() {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + `${API_CHALLENGE_LIST_TOPIC}`
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
}