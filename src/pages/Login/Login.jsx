import React, { useRef } from "react";
import style from "./login.module.css";
import Particles from "react-tsparticles";
import data from "./data";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/loginActions";
import { Navigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const sign = useSelector((state) => state.signup);
  console.log(userLogin);

  const { loading, error, expire, success } = userLogin;
  const { signup } = sign;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email.current.value, password.current.value));
    console.log(error);
  };
  //   console.log(userLogin);
  //   if (success) {
  //     navigate("/messenger");
  //     console.log("Hi");
  //   }

  const Component = () => {
    if (success) {
      return <Navigate to="/messenger" />;
    }
    return (
      <div className={style.login}>
        <div className={style.loginWrapper}>
          <div className={style.login__Left}>
            {" "}
            <Particles options={data} width="100%" height="100vh" offset={20} />
          </div>
          <div className={style.login__right}>
            {" "}
            <form onSubmit={handleSubmit}>
              {" "}
              <div className={style.login__input}>
                <input type="email" placeholder="Email" ref={email} required />
                <input
                  type="password"
                  placeholder="Password"
                  ref={password}
                  required
                />
                {loading ? <CircularProgress /> : null}
                <button disabled={loading} type="submit">
                  Login
                </button>
                {error ? <p>Something went wrong</p> : ""}
                {expire ? <p>Session Expired! please login</p> : ""}
                {signup ? <p>Registered Successfully! please login</p> : ""}
                <Link to="/signup">
                  <button disabled={loading} className={style.btn}>
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <Component />;
};
export default Login;
