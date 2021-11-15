import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userLoginReducer } from "./reducers/loginReducers";

import { signupReducer } from "./reducers/signupReducers";

const reducer = combineReducers({
  //login reducer
  userLogin: userLoginReducer,
  signup: signupReducer,
});

const middlewares = [thunk];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//console.log(userInfoFromStorage);

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  signup: { sign: null },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
