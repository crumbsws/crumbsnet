import { createSlice } from "@reduxjs/toolkit";



export const interfaceSlice = createSlice({
    name: 'inbox',
    initialState: {
        bottomNavVisible: true,
        sideBarVisible: true
      },
    reducers: {
        setBottomNavVisible: (state) => {
            state.bottomNavVisible = !state.bottomNavVisible ;
        },
        setSideBarVisible: (state) => {
            state.sideBarVisible = !state.sideBarVisible ;
        }
    }
})

export const { setBottomNavVisible, setSideBarVisible } = interfaceSlice.actions;
export default interfaceSlice.reducer;