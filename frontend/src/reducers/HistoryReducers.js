import axios from "axios";
import { setHistory } from "../actions";
// const initialState = null;

const HistoryReducers = (state, action) => {
  switch (action.type) {
    case "setHistory":
      console.log('xyz')
      return {
        transactions: "1234",
        groups: "xyz group"
        // transactions: action.payload.transactions,
        // groups: action.payload.groups
      };
    default:
      return state;
  }
};

export const history = (payload) => async (dispatch, getState) => {
  console.log(payload)
  await axios
    .post("http://localhost:3001/history", { userId: payload })
    .then((res) => {
      if (res.status === 200) {
        dispatch(
          setHistory({
            ...payload,
            transactions: res.data.newStore,
            groups: res.data.groupList,
          })
        );
        return "test";
      } else {
        dispatch(setHistory({ err: res.data.message, transactions: false }));
      }
    });
};

export default HistoryReducers;
