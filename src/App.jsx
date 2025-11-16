import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Mainroutes from "./pages/routes/Mainroutes";
import Nav from './component/Nav'
import { AxiosCurrentUser } from './store/actions/UserAction'
// import { AxiosLoadProduct } from './store/actions/ProductAction';


const App = () => {
  const { users } = useSelector((state) => state.userReducer)
  const { products } = useSelector((state) => state.productReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    !users &&
      dispatch(AxiosCurrentUser())
  }, [users])
  // useEffect(() => {
  //   products.length == 0 &&
  //     dispatch(AxiosLoadProduct())

  // }, [products])
  return (
    <div className=' p-10  w-screen min-h-screenbg-gray-200 font-sans font-[500] text-[15px] text-[#111827]'>

      <Nav />
      <Mainroutes />

    </div>
  )
}

export default App