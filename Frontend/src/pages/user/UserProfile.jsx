import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosDeleteUser, AxiosLogoutUser, AxiosUpdateUser } from '../../store/actions/UserAction';
import { useState } from 'react';


const UserProfile = () => {

    const {users} = useSelector((state)=>state.userReducer);
    
const [Msg, setMsg] = useState("")
    const dispatch=useDispatch();
const Navigate=useNavigate();

const [previewImage, setpreviewImage] = useState(users?.image || "")
    const{register,handleSubmit,reset}=useForm({
      defaultValues:{
        userName:users?.userName,
        Email:users?.Email,
        image:users?.image,
        Password:users?.Password,
      }
    });
    const UpdateProfileHandler=(user)=>{
      dispatch(AxiosUpdateUser(users.id,user))
      console.log(user);
      setMsg("✅ Profile updated successfully!");
      setTimeout(() => 
        setMsg("") , 3000);
    }
    const LogoutUserHandler=()=>{
      if(window.confirm("⚠️ Are you sure you want to delete your account?")){
        dispatch(AxiosLogoutUser(users.id));
        Navigate("/login")
      }
     
    }
    const DeleteUserHandler=()=>{
      if(window.confirm("Are you sure you want to logout?")){

        dispatch(AxiosDeleteUser(users.id));
        Navigate("/login");
      }
    }
   const HandleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setpreviewImage(imageURL);

    // Update user image in backend or local state
    const updatedUser = {
      ...users,
      image: imageURL,
    };

    dispatch(AxiosUpdateUser(users.id, updatedUser));
  }
};

  return users?(
    <div className=' w-full max-sm:w-[100vw] max-sm:-ml-5 max-sm:p-3   bg-gradient-to-brfrom-blue-50via-white to-blue-100  px-4 py-10  flex items-center justify-center'>
    <div className='bg-white w-full   max-w-5xl flex flex-col md:flex-row gap-10 shadow-2xl p-5 rounded-3xl'> 
      <div className='  p-5 flex flex-col w-full md:w-1/3 items-center rounded-1xl gap-5 shadow-lg border-r'>
<div className=' relative  '>
  <img  className="w-[200px] h-[200px] object-cover shadow-md border-4  border-blue-200 rounded-full" src={previewImage} alt="" />
<label className='bg-blue-300  p-2 absolute rounded-full bottom-2 right-5 shadow-lg cursor-pointer'>
  <input type="file" 
  accept='Image/*' 
  onChange={HandleImage}
  className='hidden'/>

   <i className="fa-solid fa-camera text-white font-black"></i>
</label>

</div>
<h2 className='font-black text-3xl text-center  text-gray-400 uppercase'>{users.userName}</h2>
<p className='text-gray-700'>{users.Email }</p>
<div className='flex gap-5'>
  <button 
     type='button'
    onClick={DeleteUserHandler}
    className='flex items-center gap bg-red-600 font-medium text-white w-fit px-4 py-2 mt-4 mb-4 rounded-lg hover:bg-red-700 cursor-pointer'>
   <i class="fa-solid fa-user-slash"></i>
        Delete User</button>
    <button
     type='button'
     onClick={LogoutUserHandler}
    className='flex items-center gap-2 bg-gray-600 font-medium text-white w-fit px-3 py-2 mt-4 mb-4 rounded-lg hover:bg-gray-700 cursor-pointer'>
      <i class="fa-solid fa-right-from-bracket"></i>
        Logout User</button>
        </div>
      </div>
    <hr />
       <form onSubmit={handleSubmit(UpdateProfileHandler)}
          className='flex flex-col w-full md:w-1/2 gap-7 border-gray-800 p-6 shadow-lg '>
            <h1 className='text-3xl text-blue-400 font-semibold'>            Edit Profile
</h1>
            
            
            <label className='-mb-6'>UserName</label>


          <input  {...register("userName")}
            className="  border border-transparent p-2  outline-none focus:border-blue-400 transition-all  rounded-xl bg-gray-100" type="text" placeholder='Enter UserName' />
           <label className='-mb-6'>Email</label>
          <input {...register("Email")}
            className=" border border-transparent p-2  outline-none focus:border-blue-400 transition-all  rounded-xl bg-gray-100" type="email" placeholder='Enter Email' />
             <label className='-mb-6'>Password</label>
          <input {...register("Password")}
            className="  border border-transparent p-2  outline-none focus:border-blue-400 transition-all  rounded-xl bg-gray-100" type="password" placeholder='Enter Password' />
             <label className='-mb-6'>Profile Image</label>
          <input {...register("image")}
          
           
            className="  border border-transparent p-2  outline-none focus:border-blue-400 transition-all  rounded-xl bg-gray-100" type="url" placeholder='Paste Profile Image' />
<div className='flex gap-5'>


    <button
    type='submit' className='flex items-center  gap-2  mt-5 bg-[#2563EB] font-medium text-white w-fit px-3 py-2 mb-1 rounded-lg hover:bg-blue-700'>
      <i class="fa-solid fa-pen-to-square"></i>
        Update User</button>
    </div>
      {Msg && (
    <p className=' text-center text-green-400 font-medium text-sm '>{Msg}</p>
  )}
</form></div> 
</div>
  ):"loading...."
}

export default UserProfile