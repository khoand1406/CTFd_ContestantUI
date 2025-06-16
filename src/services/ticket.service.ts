import { API_DETAIL_TICKET, API_ENV, API_LIST_TICKET, API_TICKET_CREATE_BY_USER, } from "@/constants/endpoints";
import { ITicketSubmit } from "@/interfaces/ticket";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";


export class TicketService extends BaseService {
    static async submitTicket(ticket: ITicketSubmit) {
        try {
            const response = await this.request({ auth: true }).post(
                API_ENV.MAIN + API_TICKET_CREATE_BY_USER,
                ticket
            );
            return response;
        } catch (error) {
            return (error as AxiosError).response;
        }
    }

    static async getTickets() {
        try {
            const response = await this.request({ auth: true }).get(
                API_ENV.MAIN + API_LIST_TICKET
            );
            return response;
        } catch (error) {
            return (error as AxiosError).response;
        }
    }

    static async getTicketDetail(id: number) {
        try {
            const response = await this.request({ auth: true }).get(
                API_ENV.MAIN + API_DETAIL_TICKET + id
            );
            return response;
        } catch (error) {
            return (error as AxiosError).response;
        }
    }
}

