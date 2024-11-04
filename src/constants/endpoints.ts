// API ENDPOINTS
export const API_ENV = {
  MAIN: "/api",
};

// AUTH RELATED
export const API_USER_LOG_IN = "/login-contestant"; // post
export const API_USER_CHANGE_PASSWORD = "/changepassword"; // post
//

// CHALLENGE RELATED
export const API_CHALLENGE_GET_TOPICS = "/challenge/by-topic"; // get
export const API_CHALLENGE_GET_LIST = "/challenges"; // get
export const API_CHALLENGE_SUBMISSION = "/submission"; // post
export const API_CHALLENGE_START = "/challenge/start"; // post
export const API_CHALLENGE_GET_BY_CATEGORY = "/challenge/list_challenge/"; // get
export const API_CHALLENGE_ATTEMPT = "/v1/challenges/attempt"; // post

// TICKET RELATED
export const API_TICKET_SUBMIT = "/ticket"; // post
export const API_TICKET_LIST = "/tickets"; // get
export const API_TICKET_DETAIL = "/ticket/"; // get