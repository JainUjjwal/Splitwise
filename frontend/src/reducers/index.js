import axios from "axios";
import { setLogin, setRegister } from "../actions";
const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setLogin":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        Fname: null,
        phoneNumber: null,
        isLogged: action.payload.isLogged,
        error: action.payload.err
      };
    case "logout":
      return {
        ...state,
        isLogged: false,
      };
    case "setRegister":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        Fname: action.payload.Fname,
        phoneNumber: action.payload.phoneNumber,
        isLogged: true,
      };
    default:
      return state;
  }
};

export const login = (payload) => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;
  await axios
    .post("http://localhost:3001/login", {
      username: payload.username,
      password: payload.password,
    })
    .then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Logged In");
        // <Redirect to="/dashboard" />
        dispatch(setLogin({...payload, isLogged:true}));
      } else {
          dispatch(setLogin({err: response.data.message, isLogged:false}))
        // return {err: response.data.message}
      }
    })
    .catch((error) => {
      const errorMessage = 'Oops! Something went wrong!' 
      dispatch(setLogin({err: errorMessage, isLogged:false}))
      //   return {err: "Something went wrong"}
    });
};

export const register = (payload) => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;

  await axios
    .post("http://localhost:3001/register", {
      username: payload.username,
      password: payload.password,
      Fname: payload.Fname,
      num: payload.num,
    })
    .then((response) => {
      if (response.status === 202) {
        alert(response.data.message);
        dispatch(setRegister(payload));
      } else {
        alert("Registration Failed");
      }
    });
};

export default userReducer;
