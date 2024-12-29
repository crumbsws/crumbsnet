import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import inboxReducer from "./reducers/inbox.js";

export const store = configureStore({
reducer: {
    user: userReducer,
    inbox: inboxReducer
}

});