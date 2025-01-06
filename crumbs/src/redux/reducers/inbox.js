import { createSlice } from "@reduxjs/toolkit";



export const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        direcActive: false,
        requestsActive: false,
        currentChannel: null
      },
    reducers: {
        setDirectActive: (state) => {
            state.directActive = !state.directActive ;
        },
        setRequestsActive: (state) => {
            state.requestsActive = !state.requestsActive ;
        },
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        }
    }
})

export const { setDirectActive, setCurrentChannel, setRequestsActive } = inboxSlice.actions;
export default inboxSlice.reducer;