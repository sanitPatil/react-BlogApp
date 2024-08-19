import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import themeReducer from "./themeSlice"
const Store = configureStore({
    reducer:{
        auth:authReducer,
        theme:themeReducer,
        
    }
})

export default Store