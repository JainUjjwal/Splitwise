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
  await axios
    .post("http://localhost:3001/groupPage", {
      groupID: payload.groupID,
      userId: payload.userId,
    })
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
  await axios
    .post("http://localhost:3001/updateGroup", {
      groupId: payload.groupId,
      groupName: payload.groupName,
      userId: payload.currentUser,
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
export const addExpense = (payload) => async (dispatch, getState) => {
  console.log(payload);
  await axios
    .post("http://localhost:3001/addBill", {
      amount: payload.newAmount,
      discription: payload.newDiscription,
      groupId: payload.groupId,
      userId: payload.currentUser,
      Fname: payload.Fname,
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
  await axios.post("http://localhost:3001/newComment", {
    commentText: payload.comment,
    Fname: payload.Fname,
    userId: payload.currentUser,
    transactionID: payload.transactionID
  }).then((response) => {
    if (response.status === 201) {
      console.log('check 2')
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
  await axios
    .post("http://localhost:3001/leaveGroup", {
      groupId: payload.groupId,
      userId: payload.currentUser,
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
