import * as actionTypes from "./userTypes";

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthorized: false,
  scope: null,
  state: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //#region Authorize

    case actionTypes.AUTHORIZE:
      return { ...state, isAuthorized: true };
    //#endregion

    //#region FETCH
    case actionTypes.GET_TOKEN_REQUEST:
      console.log("actionTypes.GET_TOKEN_REQUEST");
      return { ...state, isAuthorized: false };
    case actionTypes.GET_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        scope: action.payload.scope,
        error: "",
      };
    case actionTypes.GET_TOKEN_FAILURE:
      return {
        ...state,
        isAuthorized: true,
        accessToken: null,
        refreshToken: null,
        scope: null,
        error: action.payload,
      };
    // return { loading: false, tasks: [], error: action.payload };
    //#endregion

    default:
      return state;
  }
};

export default reducer;
