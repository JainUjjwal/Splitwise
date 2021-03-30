import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers";
import HistoryReducers from "../reducers/HistoryReducers"
import thunk from 'redux-thunk';
export default configureStore({
    reducer: {
        user: userReducer,
        history: HistoryReducers
    },
    middleware: [thunk]
})