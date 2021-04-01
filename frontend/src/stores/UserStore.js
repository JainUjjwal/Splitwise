import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers";
import HistoryReducers from "../reducers/HistoryReducers"
import thunk from 'redux-thunk';
import ProfileReducer from "../reducers/ProfileReducer";
import DashboardReducer from "../reducers/DashboardReducer";
export default configureStore({
    reducer: {
        user: userReducer,
        history: HistoryReducers,
        profile: ProfileReducer,
        dashboard: DashboardReducer
    },
    middleware: [thunk]
})