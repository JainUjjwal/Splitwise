import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers";
import HistoryReducers from "../reducers/HistoryReducers"
import thunk from 'redux-thunk';
import ProfileReducer from "../reducers/ProfileReducer";
import DashboardReducer from "../reducers/DashboardReducer";
import GroupReducer from "../reducers/GroupReducer";
import GroupPageReducer from "../reducers/GroupPageReducer";
export default configureStore({
    reducer: {
        user: userReducer,
        history: HistoryReducers,
        profile: ProfileReducer,
        dashboard: DashboardReducer,
        groupInfo: GroupReducer,
        groupPage: GroupPageReducer
    },
    middleware: [thunk]
})