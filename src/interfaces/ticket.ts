export interface ITicketSubmit {
    ticketLevel: string,
    ticketType: string,
    ticketDetails: string,
    ticketStatus: string,
    ticketResponse: string,
}

export interface ITicketResponse {
    ticketLevel: string,
    ticketType: string,
    ticketDetails: string,
    ticketStatus: string,
    ticketResponse: string,
}

export interface ITicketListResponse {
    data: Array<ITicketResponse>;
}