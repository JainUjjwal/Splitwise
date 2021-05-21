import axios from "axios";
import {
  setLogin,
  setRegister,
  setLogout,
  setHistory,
  setDashboard,
  setGroupList,
  setInviteList,
  setGroupPage,
  setProfile,
} from "../actions";
import { API_URL } from "../APIurl";
const util = require("./utilities");
const FormData = require("form-data");
const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setLogin":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        Fname: action.payload.Fname,
        phoneNumber: null,
        isLogged: action.payload.isLogged,
        error: action.payload.err,
      };
    case "setLogout":
      return {
        ...state,
        isLogged: false,
      };
    case "setRegister":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        Fname: action.payload.Fname,
        phoneNumber: action.payload.phoneNumber,
        isLogged: action.payload.isLogged,
        regError: action.payload.err,
      };
    default:
      return state;
  }
};

export const login = (payload) => async (dispatch, getState) => {
  axios.defaults.withCredentials = false;
  const query = {
    query: `{
      login(username:"${payload.username}", password:"${payload.password}"){
        Fname
        token
        expiresIn
        userId
        message
      }
    }`,
  };
  await axios.post(`${API_URL}/graphql`, query).then((response) => {
    if (response.data.errors) {
      dispatch(
        setLogin({ err: response.data.errors[0].message, isLogged: false })
      );
    } else {
      console.log(response);
      util.setLocalStorage(response.data.data.login);
      dispatch(
        setLogin({
          ...payload,
          isLogged: true,
          userId: response.data.data.login.userId,
          Fname: response.data.data.login.Fname,
        })
      );
    }
  });
  // await axios
  //   .post("http://localhost:3010/login", {
  //     username: payload.username,
  //     password: payload.password,
  //   })
  //   .then((response) => {
  //     console.log("Status Code : ", response.status);
  //     if (response.status === 200) {
  //       util.setLocalStorage(response.data);
  //       dispatch(
  //         setLogin({
  //           ...payload,
  //           isLogged: true,
  //           userId: response.data.userId,
  //           Fname: response.data.Fname,
  //         })
  //       );
  //     } else {
  //       dispatch(setLogin({ err: response.data.message, isLogged: false }));
  //       // return {err: response.data.message}
  //     }
  //   })
  //   .catch((error) => {
  //     const errorMessage = "Oops! Something went wrong!";
  //     dispatch(setLogin({ err: errorMessage, isLogged: false }));
  //   });
};

export const register = (payload) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append("image", payload.image);
  formData.append("username", payload.username);
  formData.append("password", payload.password);
  formData.append("Fname", payload.Fname);
  formData.append("phoneNumber", payload.phoneNumber);
  axios.defaults.withCredentials = true;
  const mutation = {
    mutation: `
  query {
    signUp(username: "${payload.username}", 
    password:"${payload.password}", 
    Fname:"${payload.Fname}", 
    phoneNumber:"${payload.phoneNumber}"){
      userId
      message
      token
      expiresIn
    }
  }
  `,
  };
  console.log(mutation);
  axios.defaults.withCredentials = false;
  await axios.post(`${API_URL}/graphql`, mutation).then((response) => {
    if (response.errors) {
      dispatch(setRegister({ err: "User Already Exists", isLogged: false }));
    } else {
      console.log("success");
      console.log(response.data.data.signUp);
      util.setLocalStorage(response.data.data.signUp);
      dispatch(
        setRegister({
          ...payload,
          userId: response.data.data.signUp.userId,
          isLogged: true,
        })
      );
    }
  });
  // await axios
  //   .post("http://localhost:3010/register", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status === 202) {
  // console.log("success");
  // util.setLocalStorage(response);
  // dispatch(
  //   setRegister({
  //     ...payload,
  //     userId: response.data.userId,
  //     isLogged: true,
  //   })
  // );
  //     } else if (response.status === 203) {
  //       console.log(response.data);
  //       dispatch(setRegister({ err: "User Already Exists", isLogged: false }));
  //     } else {
  //       console.log("Error on registation");
  //       console.log(response.data.err);
  //       dispatch(setRegister({ err: "Registration Error", isLogged: false }));
  //     }
  //   });
};
export const logout = (payload) => async (dispatch, getState) => {
  await axios.post("http://localhost:3010/logout").then((response) => {
    if (response.status === 204) {
      util.logoutUtil();
      dispatch(setInviteList({ ...payload, invites: null }));
      dispatch(setGroupList({ ...payload, groups: null }));
      dispatch(setDashboard({ ...payload, balance: null, friendList: null }));
      dispatch(setHistory({ transactions: [{}], groups: [] }));
      dispatch(setGroupPage({ ...payload, groupInfo: null, data: null }));
      dispatch(setProfile({ userInfo: null, imageUrl: null }));
      dispatch(setLogout({ ...payload, isLogged: false }));
    } else {
      console.log("Error on logout");
      console.log(response.data.err);
      dispatch(setLogout({ err: "Logout Error", isLogged: false }));
    }
  });
};

export default userReducer;
