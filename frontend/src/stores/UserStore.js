import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers";
import HistoryReducers from "../reducers/HistoryReducers"
import thunk from 'redux-thunk';
import ProfileReducer from "../reducers/ProfileReducer";
export default configureStore({
    reducer: {
        user: userReducer,
        history: HistoryReducers,
        profile: ProfileReducer
    },
    middleware: [thunk]
})