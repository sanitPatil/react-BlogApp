import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:'light'
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme:(state,action)=>{
            state.mode = action.payload;
        }
    }
})


export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer

