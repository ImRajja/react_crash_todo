// import { createItem, fetchItems, updateItem, deleteItem } from "../../API/api";
import * as actionTypes from "./userTypes";

//#region  FETCH

export const getTokenRequest = () => {
  return {
    type: actionTypes.GET_TOKEN_REQUEST,
  };
};

export const getTokenSuccess = (tokenDetails) => {
  return { type: actionTypes.GET_TOKEN_SUCCESS, payload: tokenDetails };
};

export const getTokenFailure = (error) => {
  return { type: actionTypes.GET_TOKEN_FAILURE, payload: error };
};

//#endregion
