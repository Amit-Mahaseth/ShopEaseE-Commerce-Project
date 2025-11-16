import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosDeleteProduct, AxiosUpdateProduct } from '../../store/actions/ProductAction';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
    const {id}=useParams();

      const {
        productReducer:{products},
        userReducer:{users}
      }   = useSelector((state)=>state);
      console.log(users);
      
      const product=products?.find((product)=>product.id==id);
      console.log(products,users);
      

      const dispatch=useDispatch();
  const Navigate=useNavigate();
      const{register,handleSubmit,reset}=useForm({
        defaultValues:{
          image:product?.image,
          title:product?.title,
          category:product?.category,
          description:product?.description,
          price:product?.price
        }
      });
      const UpdateProductHandler=(product)=>{
          product.id=nanoid();
          toast.success("Product update Successfully")
          dispatch(AxiosUpdateProduct(id,product)) 
        
      }
      const DeleteProductHandler=()=>{
      
        toast.error("Product is Deleted")
        Navigate("/product")
        dispatch(AxiosDeleteProduct(id));
      }
      
  return product ? (  
    
    <div className='w-full max-sm:w-[120vw] max-sm:py-6 max-sm:-ml-10  max-sm:px- flex flex-col bg-gradient-to-br from-blue-50 to-white py-12 px-6  '>
      <Toaster position="top-center" reverseOrder={false} />
    <div  className='  bg-white shadow-lg rounded-lg p-15   mb-10 flex justify-evenly gap-20 items-center w-full flex-col   sm:flex-row  '>
<img className='w-[25vw] max-sm:w-full   rounded-2xl object-cover h-[40vh]' src={product.image} alt="product" />
<div className=''>
<h1 className='text-5xl font-black'>{product.title}</h1>
<p className='text-2xl mt-6 text-blue-600 mb-4 font-bold'>₹{product.price}</p>
<p className='whitespace-pre-line w-full'>{product.description}</p>
<div className='flex gap-10 mt-5'>

<button
    onClick={()=>Navigate("/cart")}
 className='px-5 shadow-blue-800 border py-2 rounded-full font-bold text-white bg-blue-600  cursor-pointer hover:transition all ease  hover:scale-95'>🛒 Add to Cart</button>
<button
    onClick={()=>Navigate("/product")}
 className='border px-3 rounded-full font-semibold text-sm py-2 bg-white shadow-lg cursor-pointer hover:transition all ease  hover:scale-95'> ← Back to Product</button>
</div>
</div>
    </div>
    <div>
      <div className='p-10 text-black  w-full box-border  min-w-md shadow-lg  rounded-lg bg-white '>
{users && users?.isAdmin &&
<div>
  <h1 className='mb-5 text-3xl font-black text-blue-500 '>Edit Your Product </h1>
        <form onSubmit={handleSubmit(UpdateProductHandler)}
          className='flex flex-col  gap-2 w-full '>
            <label className='text-xl text-gray-500'>Title:</label>
          <input  {...register("title")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500  " type="text" placeholder='Enter Product Name' />
            <label className='text-xl text-gray-500'>Product Url:</label>
          <input {...register("image")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500 " type="url" placeholder='Paste Url' />
            <label className='text-xl text-gray-500'>Price:</label>
          <input {...register("price")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500" type="price" placeholder='$price' />
          <label className='text-xl text-gray-500'>Description:</label>
          <textarea {...register("description")}
            className=" border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500  h-[25vh]" type="text" placeholder='description'></textarea>
             <label className='text-xl text-gray-500'>Category:</label>
          <select {...register("category")}
            className="border outline-0 bg-gray-100 rounded-lg border-transparent p-2 focus:ring focus:ring-blue-500 " type="category" placeholder='Enter Category' defaultValue="">
            <option value="" disabled selected>
              Category
            </option>
         <option value="Clothing">Clothing</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Electronics">Electronics</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Books & Media">Books & Media</option>
     </select>
     <div className='flex gap-10'>
    <button
     className='flex items-start bg-[#2563EB] font-medium text-white w-fit px-3 py-2 mt-4 mb-4 rounded-lg hover:bg-blue-700 hover:scale-95 '>
        Update Product</button>
    <button onClick={DeleteProductHandler}
    className='flex items-start bg-red-600 font-medium text-white w-fit px-3 py-2 mt-4 mb-4 rounded-lg hover:bg-red-700 hover:scale-95 '>
        Delete Product</button>

        </div>
          
        
</form>
</div>
}
</div>
    </div>
      </div>
  ):"loading Product"
}

export default ProductDetails