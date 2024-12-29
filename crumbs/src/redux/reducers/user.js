import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        
        data: {
          id: null,
          name: null,
          point: null,
          description: null,
          home: null,
          relation: null,
          photo: null,
        },
        clubs: {
          
        }
      },
    reducers: {
        setUserData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        setUserClubs: (state, action) => {
          state.clubs = { ...state.clubs, ...action.payload };
      }
    }
})

export const { setUserData, setUserClubs } = userSlice.actions;
export default userSlice.reducer;