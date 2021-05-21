import axios from "axios";
import { setHistory } from "../actions";
const { API_URL } = require("../APIurl");
const initialState = { transactions: [{}], groups: [] };

const HistoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case "setHistory":
      return {
        ...state,
        transactions: action.payload.transactions,
        groups: action.payload.groups,
      };
    default:
      return state;
  }
};

export const history = (payload) => async (dispatch, getState) => {
  const token = localStorage.getItem("id_token");
  const userId = payload.redux_userId
    ? payload.redux_userId
    : localStorage.getItem("userId");
  console.log(API_URL);
  console.log(userId);
  console.log(payload);
  let query1 = {
    query: `
    query{
      getGroupList(userId: "${userId}")
    }
    `,
  };
  let query2 = {
    query: `
    query{
      getHistory(userId:"${userId}"){
        payer
        payee
        amount
        status
        timeStam
        discription
        group
      }
    }
    `,
  };
  axios.defaults.withCredentials = false;

  const groupListQL = await axios.post(`${API_URL}/graphql`, query1, {
    headers: {
      Authorization: token,
    },
  });
  console.log(groupListQL.data.data.getGroupList);
  await axios.post(`${API_URL}/graphql`, query2, {
    headers: {
      Authorization: token,
    },
  }).then((result)=>{
    console.log(result.data.data.getHistory);
    dispatch(
      setHistory({
        ...payload,
        transactions: result.data.data.getHistory,
        groups: groupListQL.data.data.getGroupList,
      })
    );
  });
  


  //OLD AXIOS CALLS
  // await axios
  //   .post(
  //     "http://localhost:3010/history",
  //     { userId: userId },
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     if (res.status === 200) {
  //       dispatch(
  //         setHistory({
  //           ...payload,
  //           transactions: res.data.newStore,
  //           groups: res.data.groupList,
  //         })
  //       );
  //     } else {
  //       dispatch(setHistory({ err: res.data.message, transactions: false }));
  //     }
  //   });
};

export default HistoryReducers;
