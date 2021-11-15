import axios from "axios";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from "../constants/signup";

export const Signup = (username, email, password) => async (dispatch) => {
  try {
    console.log(username, email, password);
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    console.log("dispatch1");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      // "http://localhost:5000/api/users/register",
      "https://chatappsocial.herokuapp.com/api/users/register",
      { username, email, password },
      config
    );
    console.log(data);
    dispatch({ type: USER_SIGNUP_SUCCESS });

    setTimeout(() => {
      dispatch({ type: "USER_SIGN" });
    }, 5000);
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAILED });
  }
};
export const name = () => async (dispatch) => {};
