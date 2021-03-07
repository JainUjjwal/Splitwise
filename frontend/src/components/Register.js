import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../actions";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

const Register = () => {
  // Declaring Hooks
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [Fname, setFname] = useState("");
  let [num, setNum] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
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
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/register", {
        username: username,
        password: password,
        Fname: Fname,
        num: num,
      })
      .then((response) => {
        if (response.status === 202) {
          alert(response.data.message);
          dispatch(
            register({
              username: username,
              password: password,
              Fname: Fname,
              phoneNumber: num,
              isLogged: true,
            })
          );
          history.push("/dashboard");
        } else {
          alert("Registration Failed");
        }
      });
  };

  return (
    <div>
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
