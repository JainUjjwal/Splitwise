import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { login } from "../actions";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//Login component
const LoginForm = () => {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  let history = useHistory();

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
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Logged In");
          // <Redirect to="/dashboard" />
          dispatch(
            login({
              username: username,
              password: password,
              Fname: "",
              phoneNumber: "",
              isLogged: true,
            })
          );
          history.push("/dashboard");
        } else {
          alert(response.data.message);
        }
      });
  };

  return (
    <div className="loginForm container mt-5">
      <form onSubmit={submitLogin} action="/dashboard">
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
        <SubmitButton
          text="Log In"
          type="submit"
          // onClick={submitLogin}
        />
        <Link to="/register" className="btn btn-primary ml-3">New user?</Link>
      </form>
      
    </div>
  );
  // }
};

export default LoginForm;
