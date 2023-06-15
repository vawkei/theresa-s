import {createSlice,configureStore}from '@reduxjs/toolkit';

const initialAuthState = {
    isLoggedIn:false,
    userName:'',
    userID:'',
    userEmail:''
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
      SET_ACTIVE_USER(state,action){
        //console.log(action.payload);
        state.isLoggedIn = true;
        console.log(state.isLoggedIn)
        state.userName = action.payload.userName;
        state.userID = action.payload.userID;
        state.userEmail = action.payload.userEmail
      },
      CLEAR_ACTIVE_USER(state,action){
        state.isLoggedIn = false;
        console.log(state.isLoggedIn)
        state.userName = '';
        state.userID='';
        state.userEmail = ''
      }   
    }
});

const store = configureStore({
    reducer:{auth: authSlice.reducer}
});

export const authActions = authSlice.actions;

export default store;