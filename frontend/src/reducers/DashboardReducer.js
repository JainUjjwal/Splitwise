import axios from "axios"
import {setDashboard} from "../actions"
const initialState = null;
const DashboardReducer = (state=initialState ,action)=>{
    switch (action.type) {
        case "setDashboard":
            return {
                ...state,
                balance: action.payload.data,
                friendList: action.payload.userList
            };
        default:
            return state;
    }

}

export const getDashboard = (payload) => async (dispatch, getState) =>{
    console.log(payload)
    await axios
      .get("http://localhost:3001/dashboard", {
        params: { userId: payload.userId },
      })
      .then((res) => {
        //Getting list of users to pass to create group modal
        if (res.data.message === "User Info not found") {
          console.log("no users in the database");
        } else {
        //   setUserList(res.data.userList);
        //   setData(res.data.dataBlock);
        dispatch(setDashboard({userList: res.data.userList, data: res.data.dataBlock}))
        }
      });
}

export const settle = (payload) => async (dispatch, getState) =>{
    await axios
      .post("http://localhost:3001/settle", {
        userId: payload.userId,
        user2: payload.deletionId,
      })
      .then((res) => {
        if (res.status === 200) {
        //   setSettleState(true);
        //   getDashboardData();
        dispatch(getDashboard({userId: payload.userId}))
        }
      });
}

export default DashboardReducer;