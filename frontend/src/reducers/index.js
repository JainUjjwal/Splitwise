import axios from "axios";
import { setLogin, setRegister, setLogout } from "../actions";
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
    case "setLogout":
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
        isLogged: action.payload.isLogged,
        regError: action.payload.err
      };
    default:
      return state;
  }
};

export const login = (payload) => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;
  await axios
    .post(" /login", {
      username: payload.username,
      password: payload.password,
    })
    .then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
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
    .post(" /register", {
      username: payload.username,
      password: payload.password,
      Fname: payload.Fname,
      phoneNumber: payload.phoneNumber,
    })
    .then((response) => {
      if (response.status === 202) {
        console.log("success");
        dispatch(setRegister({...payload, isLogged:true}));
      } 
      if(response.status === 203){
        console.log(response.data);
        dispatch(setRegister({err: "User Already Exists", isLogged:false}));
      }
      else {
        console.log("Error on registation");
        console.log(response.data.err)
        dispatch(setRegister({err: "Registration Error", isLogged:false}));
      }
    });
};
export const logout = (payload) => async (dispatch, getState) =>{
  await axios
    .post(" /logout")
    .then((response) => {
      if (response.status === 204) {
        dispatch(setLogout({...payload, isLogged:false}));
      } else {
        console.log("Error on logout");
        console.log(response.data.err)
        dispatch(setLogout({err: "Logout Error", isLogged:false}));
      }
    });
}
export default userReducer;
