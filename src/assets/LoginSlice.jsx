import { createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
    name:"login",
    initialState:[{
        "email": "GANTYADA.041632@tmu.ac.in",
        "password": "Koushik@123"
      }],
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const {addUser} = loginSlice.actions;
export default loginSlice.reducer;