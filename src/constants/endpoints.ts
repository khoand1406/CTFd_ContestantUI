// API ENDPOINTS
export const API_ENV = {
  MAIN: "/api",
};

// AUTH RELATED
export const API_USER_LOG_IN = "/login-contestant"; // post
export const API_USER_CHANGE_PASSWORD = "/changepassword"; // post
//
export const API_CHALLENGGE_GET_CACHE = "/api/challenge/check_cache";
export const API_CHALLENGE_CHECK_STATUS_ATTEMPT = "/api/attempt/check_cache";

export const APi_GET_CHALLENGES_HINTS = "/api/v1/hints"; //+id
export const API_UNLOCK_HINTS = "/api/v1/unlocks"; //unlock hint
export const API_GET_UNLOCKED_HINT = "/api/v1/unlocks"; //get unlock

// CHALLENGE RELATED
export const API_CHALLENGE_GET_TOPICS = "/challenge/by-topic"; // get
export const API_CHALLENGE_GET_LIST = "/challenges"; // get
export const API_CHALLENGE_SUBMISSION = "/submission"; // post

export const API_CHALLENGE_GET_BY_CATEGORY = "/challenge/list_challenge/"; // get
export const API_CHALLENGE_ATTEMPT = "/v1/challenges/attempt"; // post
export const API_CHALLENGE_LIST_TOPIC= "/get-listtopic" //get
export const API_CHALLENGE_DETAILS= "/challenge"
export const API_CHALLEGE_START = "/api/challenge/start";
export const API_CHALLENGE_STOP = "/api/challenge/stop-by-user";
export const API_CHALLENGE_CHECK_CACHE = "/api/challenge/check_cache";

// TICKET RELATED
export const API_LIST_TICKET = "/api/tickets-user";
export const API_DETAIL_TICKET = "/api/tickets"; //details
export const API_TICKET_CREATE_BY_USER = "/api/sendticket";

export const API_USER_PROFILE = "/api/v1/users/profile";
export const API_TEAM_POINT = "/api/v1/teams/contestant";
export const API_TEAM_PERFORMANCE = "/api/team/solves";

export const API_CREATE_NEW_TEAM = "/api/team/create";
export const API_JOIN_TEAM = "/api/team/join";

//dowload files
export const API_FILE_DOWLOAD = "/api/files";

//config
export const API_GET_DATE_CONFIG = "/api/get_date_config";
export const API_GET_REGISTER_STATE = "/api/get_register_config";

//notifications
export const API_GET_NOTIFICATION = "/api/v1/notifications";

//action_logs
export const API_ACTION_LOGS = "api/v1/action_logs";