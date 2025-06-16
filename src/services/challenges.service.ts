import {
  API_CHALLEGE_START,
  API_CHALLENGE_ATTEMPT,
  API_CHALLENGE_DETAILS,
  API_CHALLENGE_GET_BY_CATEGORY,
  API_CHALLENGE_GET_LIST,
  API_CHALLENGE_GET_TOPICS,
  API_CHALLENGE_LIST_TOPIC,
  API_CHALLENGE_STOP,
  API_ENV,
  API_FILE_DOWLOAD,
  APi_GET_CHALLENGES_HINTS,
  API_UNLOCK_HINTS,
} from "@/constants/endpoints";
import { IChallengeByCategoryRequest, IChallengeListRequest, IChallengeStartRequest, IChallengeStopRequest } from "@/interfaces/challenges";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";



export class ChallengeService extends BaseService {
  static async stopChallenge(req: IChallengeStopRequest) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_CHALLENGE_STOP, 
        req
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
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
        API_ENV.MAIN + API_CHALLEGE_START,
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
  static async listChallengeByTopic(topicName: string){
    try{
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + `${API_CHALLENGE_GET_BY_CATEGORY}/${topicName}`
      );
      return response;
    }catch(error){
      return (error as AxiosError).response;
    }
  }
  static async fetchhintDetails(hintId: number){
    try {
      const response= await this.request({auth: true}).get(
        `${APi_GET_CHALLENGES_HINTS}/${hintId}`
      )
      return response
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
  static async unlockHint(hintId: number){
    try {
      const response= await this.request({auth:true}).post(
        API_UNLOCK_HINTS, 
        {
          type: "hints",
          target: hintId
        }
      )
      return response
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
  static async getFiles(){
    try {
      const response= await this.request({auth:true}).get(
        API_FILE_DOWLOAD
      )
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  }
}
