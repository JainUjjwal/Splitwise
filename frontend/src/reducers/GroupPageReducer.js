import axios from "axios";
import { setGroupPage } from "../actions";

const initialState = null;


const GroupPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setGroupPage":
      return {
        ...state,
        groupInfo: action.payload.GroupInfo,
        data: action.payload.transactions,
      };
    default:
      return state;
  }
};

export const getGroupPageInfo = (payload) => async (dispatch, getState) => {
  console.log(payload);
  const token = localStorage.getItem("id_token");
  const userId = localStorage.getItem("userId")
  await axios
    .post(
      "http://54.153.78.74:3010/groupPage",
      {
        groupID: payload.groupID,
        userId: payload.userId?payload.userId:userId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      dispatch(
        setGroupPage({
          ...payload,
          GroupInfo: response.data.dummyInfo,
          transactions: response.data.transactionList,
        })
      );
    });
};

export const editGroupName = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  await axios
    .post(
      "http://54.153.78.74:3010/updateGroup",
      {
        groupId: payload.groupId,
        groupName: payload.groupName,
        userId: payload.currentUser,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        dispatch(
          getGroupPageInfo({
            userId: payload.currentUser,
            groupID: payload.groupId,
          })
        );
      }
    });
};
export const addExpense = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  console.log(payload);
  await axios
    .post("http://54.153.78.74:3010/addBill", {
      amount: payload.newAmount,
      discription: payload.newDiscription,
      groupId: payload.groupId,
      userId: payload.currentUser,
      Fname: payload.Fname,
    }, {
      headers: {
        'Authorization': token,
      }
    })
    .then((response) => {
      if (response.status === 201) {
        dispatch(
          getGroupPageInfo({
            userId: payload.currentUser,
            groupID: payload.groupId,
          })
        );
      }
    });
};
export const sendComment = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  await axios
    .post("http://54.153.78.74:3010/newComment", {
      commentText: payload.comment,
      Fname: payload.Fname,
      userId: payload.currentUser,
      transactionID: payload.transactionID,
    }, {
      headers: {
        'Authorization': token,
      }
    })
    .then((response) => {
      if (response.status === 201) {
        console.log("check 2");
        dispatch(
          getGroupPageInfo({
            userId: payload.currentUser,
            groupID: payload.groupId,
          })
        );
      }
    });
};
export const leaveGroup = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  await axios
    .post("http://54.153.78.74:3010/leaveGroup", {
      groupId: payload.groupId,
      userId: payload.currentUser,
    }, {
      headers: {
        'Authorization': token,
      }
    })
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
        dispatch(getGroupPageInfo(null));
      }
      if (response.status === 202) {
        alert(response.data.message);
      }
    });
};
export default GroupPageReducer;
