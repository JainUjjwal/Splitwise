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
  const currentUser = payload.currentUser?payload.currentUser:localStorage.getItem("userId");
  const token = localStorage.getItem("id_token");
  await axios
    .post(
      "http://localhost:3010/createGroup",
      { addedFriend, groupName, currentUser },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      //ADD CONFIRMATION ON GROUP CREATION
      if (response.status === 251) {
        alert("Group created!");
      }
    });
};

// Function to get data for my groups
export const getInviteInfo = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  const userId = localStorage.getItem("userId")
  let query = {
    query: `
    query{
      getInvites(userId: "${userId}"){
        _id
        groupName
      }
    }
    `,
  };
  await axios
  .post("http://localhost:3010/graphql", query, {
    headers: {
      Authorization: token,
    },
  }).then((result)=>{
    console.log(result.data.data.getInvites)
    if (result.status === 200) {
      console.log('/////////////////')
      console.log(result.data.data.getInvites);
      dispatch(setInviteList({ ...payload, invites: result.data.data.getInvites }));
    }
  })
  // await axios
  //   .get("http://localhost:3010/mygroups", {
  //     params: { userId: payload.userId?payload.userId:userId },
  //     headers: {
  //       'Authorization': token,
  //     }
  //   })
  //   .then((res) => {
  //     if (res.status === 201) {
  //       console.log('/////////////////')
  //       console.log(res.data.inviteGroup);
  //       dispatch(setInviteList({ ...payload, invites: res.data.inviteGroup }));
  //     }
  //     if (res.status === 101) {
  //       console.log("Error in getting group info");
  //     }
  //   });
};

export const getGroupInfo = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token")
  const userId = localStorage.getItem("userId")
  let query = {
    query: `
    query{
      getGroups(userId: "${userId}"){
        _id
        groupName
      }
    }
    `,
  };
  await axios
  .post("http://localhost:3010/graphql", query, {
    headers: {
      Authorization: token,
    },
  }).then((result)=>{
    console.log(result.data.data.getGroups)
    if (result.status === 200) {
      console.log('/////////////////')
      console.log(result.data.data.getGroups);
      dispatch(setGroupList({ ...payload, groups: result.data.data.getGroups }));
    }
  })
  // await axios
  //   .post("http://localhost:3010/mygroups", { userId: payload.userId?payload.userId:userId }, {headers: {
  //     'Authorization': token,
  //   }})
  //   .then((res) => {
  //     if (res.status === 201) {
  //       console.log("get group info");
  //       console.log(res.data.myGroups);
  //       dispatch(setGroupList({ ...payload, groups: res.data.myGroups }));
  //     }
  //   });
};

// functions to handle group rejection or accept request
export const groupRejection = (payload) => async (dispatch, getState) => {
  const rejectedGroup = payload.rejectedGroup;
  const userId = payload.userId?payload.userId:localStorage.getItem("userId");
  const token = localStorage.getItem("id_token");
  console.log(payload);
  await axios
    .post("http://localhost:3010/rejInvStatus", { rejectedGroup, userId }, {headers: {
      'Authorization': token,
    }})
    .then((response) => {
      if (response.status === 269) {
        dispatch(getGroupInfo({ userId: payload.userId }));
        dispatch(getInviteInfo({ userId: payload.userId }));
      }
    });
};

export const groupAcception = (payload) => async (dispatch, getState) => {
  const acceptedGroup = payload.acceptedGroup;
  const userId = payload.userId?payload.userId:localStorage.getItem("userId");
  console.log("sending accept request");
  const token = localStorage.getItem("id_token");
  await axios
    .post("http://localhost:3010/accInvStatus", { acceptedGroup, userId },{headers: {
      'Authorization': token,
    }})
    .then((response) => {
      if (response.status === 269) {
        console.log("accept request serviced");
        dispatch(getInviteInfo({ userId: payload.userId }));
        console.log("dispatching to update information");
        dispatch(getGroupInfo({ userId: payload.userId }));
      }
    });
};

export default GroupReducer;
