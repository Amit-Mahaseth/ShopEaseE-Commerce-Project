import axios from "../../api/axiosconfig"
import Product from "../../pages/Product";
import { loadproduct } from "../reducers/ProductSlice";




export const AxiosLoadProduct = () => async (dispatch, getState) => {
  try {
const {data}=await axios.get("/products");
dispatch(loadproduct(data))
   
  }
  catch (error) {
    console.log(error);
  }
};
export const AxiosCreateProduct = (products) => async (dispatch, getState) => {
dispatch(AxiosLoadProduct());
  try {
    await axios.post("/products", products);
    dispatch(AxiosLoadProduct());
  }
  catch (error) {
    console.log(error);
  }
  }
export const AxiosUpdateProduct = (id,products) => async (dispatch, getState) => {
dispatch(AxiosLoadProduct());
  try {
    await axios.patch("/products/"+id, products);
    dispatch(AxiosLoadProduct());
  }
  catch (error) {
    console.log(error);
  }
  }
export const AxiosDeleteProduct = (id) => async (dispatch, getState) => {
dispatch(AxiosLoadProduct());
  try {
    await axios.delete("/products/"+id);
    dispatch(AxiosLoadProduct());
  }
  catch (error) {
    console.log(error);
  }
  }
