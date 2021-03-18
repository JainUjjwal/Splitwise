import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers";
import { Link, Redirect } from "react-router-dom";

//Login component
const LoginForm = () => {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  //username change handler to update state variable with the text entered by the user
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  //password change handler to update state variable with the text entered by the user
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };
  let redirectVar = null;
  if (user ? user.isLogged : false) {
    redirectVar = <Redirect to="/dashboard" />;
  }

  return (
    <div className="loginForm container mt-5">
      <div>{redirectVar}</div>
      {user && user.error?<div className="alert alert-danger"> {user.error} </div>: ""}
      <form onSubmit={submitLogin} action="/dashboard">
        <FormInput
          text="Email"
          id="username"
          type="email"
          onChange={usernameChangeHandler}
          style={user && user.error ? true : false}
          required={true}
        />
        <FormInput
          text="Password"
          id="password"
          type="password"
          onChange={passwordChangeHandler}
          style={user && user.error ? true : false}
          required={true}
        />
        <SubmitButton text="Log In" type="submit" />
        <Link to="/register" className="btn btn-primary ml-3">
          New user?
        </Link>
      </form>
    </div>
  );
  // }
};

export default LoginForm;
