import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers";
import thunk from 'redux-thunk';
export default configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [thunk]
})