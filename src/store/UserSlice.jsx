    import { createSlice } from "@reduxjs/toolkit";
    const initialState={
        users:null,
        cart:[],
    }
    const userslice=createSlice({
        name:"user",
        initialState,
        reducers:{
            loaduser:(state,action)=>{
                 state.users=action.payload;
            },
            removeUser: (state) => {
        state.users = null;
        },
        },
    })
    export const {loaduser,removeUser}=userslice.actions;

    export default userslice.reducer;