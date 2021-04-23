import axios from "axios";
import { setProfile } from "../actions";
const FormData = require("form-data");
const initialState = null;


const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setProfile":
      return {
        ...state,
        info: action.payload.userInfo,
        imageUrl: action.payload.imageUrl,
      };
    default:
      return state;
  }
};

export const getProfile = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  const userId = localStorage.getItem("userId")
  console.log(payload.userId)
  await axios
    .get("http://localhost:3010/profile", {
      params: { userId: payload.userId?payload.userId:userId },
      headers: {
        'Authorization': token,
      },
    })
    .then((res) => {
      console.log(res.data);
      const url =
        res.data && res.data.imgPath && res.data.imgPath.length > 4
          ? "/userImages/" + res.data.username + ".jpg"
          : "/userImages/default.jpg";
      dispatch(setProfile({ userInfo: res.data, imageUrl: url }));
    });
};

export const updateProfile = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  const formData = new FormData();
  formData.append("userId", payload.redux_userId);
  formData.append("image", payload.updatedData.image);
  formData.append("username", payload.updatedData.username);
  formData.append("Fname", payload.updatedData.Fname);
  formData.append("phoneNumber", payload.updatedData.phoneNumber);
  formData.append("lang", payload.updatedData.lang);
  formData.append("currency", payload.updatedData.currency);
  formData.append("timezone", payload.updatedData.timezone);
  await axios
    .post("http://localhost:3010/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': token,
      },
    })
    .then((res, req) => {
      if (res.status === 201) {
        console.log(res.data.message);
        dispatch(getProfile({ userId: payload.redux_userId }));
      }
    });
};
export default ProfileReducer;
