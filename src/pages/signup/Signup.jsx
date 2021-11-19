import style from "./signup.module.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import data from "../Login/data";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../../actions/signupAction";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const sign = useSelector((state) => state.signup);
  const { loading } = sign;
  //console.log(loading);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password.current.value === confirmPassword.current.value) {
        dispatch(
          Signup(
            name.current.value,
            email.current.value,
            password.current.value
          )
        );
        navigate("/");
        //console.log("Hi");
      } else {
        throw new Error("Password doesn't match");
      }
      //console.log(loading);
    } catch (error) {
      //console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  return (
    <div className={style.signup}>
      <div className={style.signupWrapper}>
        <div className={style.signup_left}>
          <Particles options={data} width="100%" height="100vh" />
        </div>
        <div className={style.signup_right}>
          <form onSubmit={handleSubmit}>
            <div className={style.signup_right_wrapper}>
              {" "}
              <input type="text" placeholder="Name" ref={name} required />
              <input type="email" placeholder="Email" ref={email} required />
              <input
                type="password"
                placeholder="Password"
                ref={password}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmPassword}
                required
              />
              <button disabled={loading} type="submit">
                Signup
              </button>
              {error && <span>Something went wrong please try again</span>}
              {loading ? <CircularProgress /> : null}
              <Link to="/">
                {" "}
                <button className={style.btn}>Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
