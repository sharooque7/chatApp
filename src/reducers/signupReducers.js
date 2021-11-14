import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from "../constants/signup";

export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
        signup: false,
      };

    case USER_SIGNUP_SUCCESS:
      return { loading: false, signup: true };

    case USER_SIGNUP_FAILED: {
      return { loading: false, signup: false };
    }
    default:
      return state;
  }
};
