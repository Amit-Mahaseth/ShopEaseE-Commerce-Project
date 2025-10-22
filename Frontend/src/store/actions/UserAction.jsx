import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosconfig"
import { loaduser, removeUser } from "../reducers/UserSlice"
// const Navigate=useNavigate();

export const AxiosCurrentUser = () => async (dispatch, getState) => {
  try {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loaduser(user))
    } else {
      console.log("User Not Found");
    }
  }
  catch (error) {
    console.log(error);
  }
};
export const AxiosLogoutUser = (user) => async (dispatch, getState) => {
  try {

    localStorage.removeItem("user");
    dispatch(removeUser());
  }
  catch (error) {
    console.log(error);
  }
};
export const AxiosLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/users?Email=${user.Email}&Password=${user.Password}`
    );
    localStorage.setItem("user",JSON.stringify(data[0]));
    dispatch(loaduser(data[0]));
    dispatch(AxiosCurrentUser());
    // Navigate("/")
    

  }
  catch (error) {
    console.log(error);
  }
};
export const AxiosRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res= await axios.post("/users",user);
  }
  catch (error) {
    console.log(error);
  }
}
export const AxiosUpdateUser = (id,user) => async (dispatch, getState) => {
  try {
    const {data}= await axios.patch("/users/" + id,user);

    console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
dispatch(AxiosCurrentUser());
  }
  catch (error) {
    console.log(error);
  }
}
export const AxiosDeleteUser = (id) => async (dispatch, getState) => {

  try {
    await axios.delete("/users/"+id);
    dispatch( AxiosLogoutUser());
    console.log("user Deleted");
    
  }
  catch (error) {
    console.log(error);
  }
  }
