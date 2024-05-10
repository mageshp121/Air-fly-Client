import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:'user',
    initialState:{
         userData:{},
         seatPrice:"",
         fliightId:"",
         userEmial:""
    },
    reducers:{
        addUser:(state,action)=>{
            state.userData = {...state.userData,...action.payload}
       },
       clearUser:(state)=>{
           state.userData={}
       },
       addFlight:(state,action)=>{
           state.seatPrice = action.payload
       },
       addFlightId:(state,action)=>{
        state.fliightId = action.payload
       },
       addEmail:(state,action)=>{
        state.userEmial = action.payload
       }
    }

})
export const {addUser,clearUser,addFlight,addFlightId,addEmail} = userSlice.actions
export default userSlice.reducer; 