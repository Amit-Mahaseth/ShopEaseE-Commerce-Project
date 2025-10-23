import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
}
const ProductSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        
        loadproduct:(state,action)=>{
state.products=action.payload
        },
        loadLazyproduct:(state,action)=>{
state.products=[...state.products ,...action.payload]
        }
    }
})
export default ProductSlice.reducer;
export const {loadLazyproduct,loadproduct}=ProductSlice.actions