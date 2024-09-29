import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    club: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload;
        },
        setClub: (state, action) => {
            state.club = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;