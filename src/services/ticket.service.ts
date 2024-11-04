import { BaseService } from "@/services/base.service";
import { ITicketSubmit } from "@/interfaces/ticket";
import { API_ENV, API_TICKET_SUBMIT, API_TICKET_LIST, API_TICKET_DETAIL } from "@/constants/endpoints";
import { AxiosError } from "axios";


export class TicketService extends BaseService {
    static async submitTicket(ticket: ITicketSubmit) {
        try {
            const response = await this.request({ auth: true }).post(
                API_ENV.MAIN + API_TICKET_SUBMIT,
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
                API_ENV.MAIN + API_TICKET_LIST
            );
            return response;
        } catch (error) {
            return (error as AxiosError).response;
        }
    }

    static async getTicketDetail(id: number) {
        try {
            const response = await this.request({ auth: true }).get(
                API_ENV.MAIN + API_TICKET_DETAIL + id
            );
            return response;
        } catch (error) {
            return (error as AxiosError).response;
        }
    }
}

