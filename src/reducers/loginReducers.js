import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/login";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: true };

    case "USER_ERROR":
      return { error: false };

    case USER_LOGOUT_REQUEST:
      return {
        expire: true,
      };

    case "USER_LOGOUT":
      return {
        expire: false,
      };

    default:
      return state;
  }
};
