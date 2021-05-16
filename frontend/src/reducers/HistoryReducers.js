import axios from "axios";
import { setHistory } from "../actions";
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
  const userId = payload.redux_userId ? payload.redux_userId :localStorage.getItem("userId");
  console.log(userId);
  console.log(payload);
  await axios
    .post(
      "http://localhost:3010/history",
      { userId:  userId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        dispatch(
          setHistory({
            ...payload,
            transactions: res.data.newStore,
            groups: res.data.groupList,
          })
        );
      } else {
        dispatch(setHistory({ err: res.data.message, transactions: false }));
      }
    });
};

export default HistoryReducers;
