import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import inboxReducer from "./reducers/inbox.js";
import interfaceReducer from "./reducers/interface.js";

export const store = configureStore({
reducer: {
    user: userReducer,
    inbox: inboxReducer,
    interface: interfaceReducer
}

});