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
  let [err, setErr] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  // Phone Number change handler
  const numHandler = (e) => {
    if(e.target.value.length===10){
      setNum(e.target.value);
      setErr(null);
    }
    else{
     setErr('Phone Number must consist of 10 digits.')
    }
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
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if((e.target.value).match(reg)){
      setPassword(e.target.value);
      setErr(null);
    }else{
      setErr('Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter')
    }
    
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
      
      <div className="resgisterForm container mt-5">
      {user && user.regError?<div className="alert alert-danger"> {user.regError} </div>: ""}
      {err?(<div className="alert alert-danger"> {err} </div>):''}
        <form onSubmit={submitRegister}>
          <FormInput
            text="Email"
            id="username"
            type="email"
            onChange={usernameChangeHandler}
            required={true}
            style={user && user.regError ? true : false}
          />
          <FormInput
            text="Password"
            id="password"
            type="password"
            onChange={passwordChangeHandler}
            required={true}
            style={user && user.regError ? true : false}
          />
          <FormInput
            text="First Name"
            id="Fname"
            type="text"
            onChange={FnameHandler}
            required={true}
            style={user && user.regError ? true : false}
          />
          
          <FormInput
            text="Phone Number"
            id="num"
            type="number"
            onChange={numHandler}
            required={true}
            style={user && user.regError ? true : false}
          />
          <SubmitButton text="Register" type="submit" disabled={err?true:false}/>
          <Link to="/login" className="btn btn-primary ml-3">Existing User?</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
