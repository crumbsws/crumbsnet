import { createSlice } from "@reduxjs/toolkit";



export const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        active: false
      },
    reducers: {
        setActive: (state) => {
            state.active = !state.active;
        },
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        }
    }
})

export const { setActive, setCurrentChannel } = inboxSlice.actions;
export default inboxSlice.reducer;