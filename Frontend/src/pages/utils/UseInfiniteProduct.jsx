import React, { useEffect, useState } from 'react'
import axios from '../../api/axiosconfig';
import { loadLazyproduct } from "../../store/reducers/productSlice";

import { useDispatch, useSelector } from 'react-redux';
const UseInfiniteProduct = () => {
const dispatch=useDispatch();
const {products}=useSelector((state)=>state.productReducer)
  const [hasmore, sethasmore] = useState(true);
    const FetchProduct = async () => {

        try {
          const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
         
          if (data.length==0) {
            sethasmore(false);
       
          } else {
            sethasmore(true);
            dispatch(loadLazyproduct(data))
          }
       
        }
        catch {
    
        }
      }
        useEffect(() => {

    FetchProduct()
  }, [])

    return { products, hasmore, FetchProduct };

}

export default UseInfiniteProduct