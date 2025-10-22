import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { AxiosCreateProduct } from '../../store/actions/ProductAction';

const CreateProduct = () => {
const dispatch=useDispatch();
const Navigate=useNavigate();
    const{register,handleSubmit,reset}=useForm();

    const CreateProductHandler=(product)=>{
        product.id=nanoid();
        dispatch(AxiosCreateProduct(product))
      
    }
  return (
    <div className="flex w-full md:w-full  max-sm:w-[100vw] max-sm:p-2 max-sm:-ml-5 bg-gradient-to-br from-blue-50 to-white py-12 px-6 items-center min-h-screen justify-center bg-white shadow-lg p-10     ">
      <div className='p-10 text-black bg-white w-full   box-border  md:w-1/2 shadow-lg  rounded-lg'>
      <h1 className='text-center mb-10 font-sans text-2xl font-black text-blue-500'>Create Product !</h1>
        <form onSubmit={handleSubmit(CreateProductHandler)}
          className='flex flex-col  gap-2 '>
          <label className='text-xl text-gray-500'>Title:</label>
          <input  {...register("title")}
            className="border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500 " type="text" placeholder='Enter Product Name' />
         <label className='text-xl text-gray-500'>Product Url:</label>
          
          <input {...register("image")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500 " type="url" placeholder='Paste Url' />
           <label className='text-xl text-gray-500'>Price:</label>
          <input {...register("price")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500  " type="price" placeholder='$price' />
           <label className='text-xl text-gray-500'>Description:</label>
          <textarea {...register("description")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500 h-[25vh]" type="text" placeholder='description'></textarea>
         <label className='text-xl text-gray-500'>Category:</label>
          <select {...register("category")}
            className="border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500  text-black " type="category" placeholder='Enter Category' defaultValue="">
            <option value="" disabled selected>
              Category
            </option>
          <option value="All">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Electronics">Electronics</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Books & Media">Books & Media</option>
     </select>
    <button className='flex items-start bg-[#2563EB] font-medium text-white w-fit px-3 py-2 mt-4 mb-4 rounded-lg cursor-pointer  hover:bg-blue-700 hover:transition all  ease hover:scale-95'>
        Create Product</button>
    
</form>
</div>
</div>

  )
}

export default CreateProduct