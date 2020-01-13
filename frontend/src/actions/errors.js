export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const GET_ERRORS = "GET_ERRORS";

export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};
