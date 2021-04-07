import axios from "axios";
import { setInviteList, setGroupList } from "../actions";

const initialState = null;

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "createGroup":
      return { ...state };
    case "setInviteList":
      return {
        ...state,
        invites: action.payload.invites,
      };
    case "setGroupList":
      return {
        ...state,
        groups: action.payload.groups,
      };
    default:
      return state;
  }
};


// MIDDLEWARE FUNCTIONS

// function to create group from dashboard createGroupModal
export const createGroup = (payload) => async (dispatch, getState) => {
  const addedFriend = payload.addedFriend;
  const groupName = payload.groupName;
  await axios
    .post("http://localhost:3001/createGroup", { addedFriend, groupName })
    .then((response) => {
      //ADD CONFIRMATION ON GROUP CREATION
      if (response.status === 251) {
        alert("Group created!");
      }
    });
};

// Function to get data for my groups
export const getInviteInfo = (payload) => async (dispatch, getState) => {
  await axios
    .get("http://localhost:3001/mygroups", {
      params: { userId: payload.userId },
    })
    .then((res) => {
      if (res.status === 201) {
        console.log(res.data.inviteGroup)
        dispatch(setInviteList({ ...payload, invites: res.data.inviteGroup }));
        // dispatch(setGroupList({ ...payload, groups: res.data.myGroups }));
        // dispatch(setMyGroupsInfo({...payload, groups: res.data.myGroups, invites: res.data.inviteGroup}))
      }
      if (res.status === 101) {
        console.log("Error in getting group info");
      }
    });

};

export const getGroupInfo = (payload) => async (dispatch, getState) => {
  await axios
  .post("http://localhost:3001/mygroups", { userId: payload.userId })
  .then((res) => {
    if (res.status === 201) {
      console.log("get group info")
      console.log(res.data.myGroups)
      dispatch(setGroupList({ ...payload, groups: res.data.myGroups }));
    }
  });
}

// functions to handle group rejection or accept request
export const groupRejection = (payload) => async (dispatch, getState) =>{
  const rejectedGroup = payload.rejectedGroup
  console.log(payload)
  await  axios.post("http://localhost:3001/rejInvStatus", { rejectedGroup }).then((response) => {
      if (response.status === 269) {
        dispatch(getGroupInfo({userId:payload.userId}));
        dispatch(getInviteInfo({userId: payload.userId}))
      }
    });
}

export const groupAcception = (payload) => async (dispatch, getState) =>{
  const acceptedGroup = payload.acceptedGroup
  console.log('sending accept request')
  await  axios.post("http://localhost:3001/accInvStatus", { acceptedGroup }).then((response) => {
      if (response.status === 269) {
        console.log('accept request serviced')
        dispatch(getInviteInfo({ userId: payload.userId }));
        console.log('dispatching to update information')
        dispatch(getGroupInfo({userId: payload.userId}));
      }
    });
}

export default GroupReducer;
