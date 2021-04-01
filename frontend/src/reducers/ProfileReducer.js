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
                imageUrl: action.payload.imageUrl
            };
        default:
            return state;
    }
}

export const getProfile = (payload) => async (dispatch, getState) => { 
    await axios
      .get("http://localhost:3001/profile", {
        params: { userId: payload.userId},
      })
      .then((res) => {  
        const url =
        res.data[0] && res.data[0].imgPath && res.data[0].imgPath.length > 4
            ? "/userImages/" + res.data[0].username + ".jpg"
            : "/userImages/default.jpg";
        dispatch(setProfile({userInfo: res.data[0], imageUrl: url}))
      });
}

export const updateProfile = (payload) => async (dispatch, getState) =>{
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
      .post("http://localhost:3001/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res, req) => {
        if (res.status === 201) {
          console.log(res.data.message);
          dispatch(getProfile({userId: payload.redux_userId}))
        }
      });
}
export default ProfileReducer