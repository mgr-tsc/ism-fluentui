import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userName: null,
    userRole: null,
    companyCode: null,
}

const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.userName;
            state.userRole = action.payload.userRole;
            state.companyCode = action.payload.companyCode;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userName = null;
            state.userRole = null;
            state.companyCode = null;
        },
    },
});

export const { logIn, logOut } = userAccountSlice.actions;
export default userAccountSlice.reducer;
