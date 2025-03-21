import { createSlice } from "@reduxjs/toolkit";



export const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        direcActive: false,
        requestsActive: false,
        lastActiveChannel: null,
        systemMessagesActive: false,
        currentChannel: null
      },
    reducers: {
        setDirectActive: (state) => {
            state.directActive = !state.directActive ;
        },
        setLastActiveChannel: (state, action) => {
            state.lastActiveChannel = action.payload;
        },
        setRequestsActive: (state) => {
            state.requestsActive = !state.requestsActive ;
        },
        setSystemMessagesActive: (state) => {
            state.systemMessagesActive = !state.systemMessagesActive ;
        },
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        }
    }
})

export const { setDirectActive, setLastActiveChannel, setCurrentChannel, setRequestsActive, setSystemMessagesActive } = inboxSlice.actions;
export default inboxSlice.reducer;