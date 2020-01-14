import {
  GET_URLS,
  GET_BY_URL,
  ADD_REQUEST,
  DELETE_ITEM
} from "../actions/urls";

const initalState = {
  urls: [],
  selectedUrl: [],
  parameters: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_URLS:
      return {
        ...state,
        urls: action.payload
      };
    case GET_BY_URL:
      return {
        ...state,
        selectedUrl: action.payload[0],
        parameters: action.payload[1]
      };
    case DELETE_ITEM:
    case ADD_REQUEST:
    default:
      return state;
  }
}
