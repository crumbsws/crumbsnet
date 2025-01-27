import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        
        data: {},
        clubs: {},
        contacts: {}
      },
    reducers: {
        setUserData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        setUserClubs: (state, action) => {
          state.clubs = { ...state.clubs, ...action.payload };
        },
        setUserContacts: (state, action) => {
          state.contacts = { ...state.contacts, ...action.payload };
        }
    }
})

export const { setUserData, setUserClubs, setUserContacts } = userSlice.actions;
export default userSlice.reducer;