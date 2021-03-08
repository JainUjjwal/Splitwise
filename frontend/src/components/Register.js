import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../reducers";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

const Register = () => {
  // Declaring Hooks
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [Fname, setFname] = useState("");
  let [num, setNum] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  // Phone Number change handler
  const numHandler = (e) => {
    setNum(e.target.value);
  };

  // First Name change handler to update state variable
  const FnameHandler = (e) => {
    setFname(e.target.value);
  };
  
  //username change handler to update state variable
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  //password change handler to update state variable
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    dispatch(
      register({
        username: username,
        password: password,
        Fname: Fname,
        phoneNumber: num,
      })
    );
  };
  let redirectVar = null;
  if (user ? user.isLogged : false) {
    redirectVar = <Redirect to="/dashboard" />;
  }
  return (
    <div>
      {redirectVar}
      {user && user.regError?<div className="alert alert-danger"> {user.regError} </div>: ""}
      <div className="resgisterForm container mt-5">
        <form onSubmit={submitRegister}>
          <FormInput
            text="Email"
            id="username"
            type="email"
            onChange={usernameChangeHandler}
          />
          <FormInput
            text="Password"
            id="password"
            type="password"
            onChange={passwordChangeHandler}
          />
          <FormInput
            text="First Name"
            id="Fname"
            type="text"
            onChange={FnameHandler}
          />
          <FormInput
            text="Phone Number"
            id="num"
            type="number"
            onChange={numHandler}
          />
          <SubmitButton text="Register" type="submit" />
          <Link to="/login" className="btn btn-primary ml-3">Existing User?</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
