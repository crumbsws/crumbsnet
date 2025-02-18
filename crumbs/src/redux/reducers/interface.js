import { createSlice } from "@reduxjs/toolkit";



export const interfaceSlice = createSlice({
    name: 'inbox',
    initialState: {
        bottomNavVisible: true
      },
    reducers: {
        setBottomNavVisible: (state) => {
            state.bottomNavVisible = !state.bottomNavVisible ;
        }
    }
})

export const { setBottomNavVisible } = interfaceSlice.actions;
export default interfaceSlice.reducer;