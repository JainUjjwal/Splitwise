import axios from "axios";
import { setGroupPage } from "../actions";

const initialState = null;
const GroupPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setGroupPage":
      return {
        ...state,
        groupName: action.payload.GroupInfo,
        data: action.payload.transactions,
        members: action.payload.members
      };
    default:
      return state;
  }
};

export const getGroupPageInfo = (payload) => async (dispatch, useState) => {
  console.log(payload);
  await axios
    .post("http://localhost:3001/groupPage", {
      groupID: payload.groupId,
      userId: payload.currentUser,
    })
    .then((response) => {
        console.log(response.data)
      dispatch(
        setGroupPage({
          ...payload,
          GroupInfo: response.data.dummyInfo.groupName,
          transactions: response.data.transactionList,
          members: response.data.dummyInfo.members
        })
      );
      // setGroupInfo(response.data.dummyInfo);
      // setData(response.data.transactionList);
    });
};

export default GroupPageReducer;
