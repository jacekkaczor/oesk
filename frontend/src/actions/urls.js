import axios from "axios";
import { createMessage, returnErrors } from "./messages";

export const GET_URLS = "GET_URLS";
export const GET_BY_URL = "GET_BY_URL";
export const ADD_REQUEST = "ADD_REQUEST";
export const DELETE_ITEM = "DELETE_ITEM";

export const getUrls = () => dispatch => {
  axios
    .get("http://localhost:5000/api/commands/urls", {
      headers: {
        Accept: "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: GET_URLS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getByUrl = url => dispatch => {
  axios
    .get("http://localhost:5000/api/commands/byUrl?url=" + url, {
      headers: {
        Accept: "application/json"
      }
    })
    .then(res => {
      var newData = [];
      res.data.map(result => {
        if (result.results.length !== 0) newData.push(result);
      });
      dispatch({
        type: GET_BY_URL,
        payload: [
          res.data,
          newData.reduce((params, { n, c }) => {
            if (!params[n]) params[n] = [];
            params[n].push(c);
            return params;
          }, {})
        ]
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addRequest = request => dispatch => {
  axios
    .post("http://localhost:5000/api/commands", request, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch(createMessage({ addRequest: "Request Added" }));
      dispatch({
        type: ADD_REQUEST
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (table, id) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/${table}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch(createMessage({ deleteItem: "Item Deleted" }));
      dispatch({
        type: DELETE_ITEM
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
