// import { configureStore } from "@reduxjs/toolkit";
// import { productReducer } from "./productSlice";
// import { registerUser } from "./registerSlice";
// import loginUser from './userSlice';


// export const myStore = configureStore({
//     reducer: {
//         productSlice: productReducer,
//         registerSlice: registerUser,
//         user: loginUser,

//     },
// });


import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice"; // ✅ Ensure correct import
import registerReducer from "./registerSlice"; 
import userReducer from "./userSlice";

export const myStore = configureStore({
    reducer: {
        productSlice: productReducer, // ✅ Matches `useSelector(state => state.productSlice)`
        registerSlice: registerReducer,
        user: userReducer,
    },
});