import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const Home = lazy(() => import("../../pages/Home"));
const Cart = lazy(() => import("../../pages/Cart"));
const Product = lazy(() => import("../../pages/Product"));
const Register = lazy(() => import('../../pages/Register'));
const Login = lazy(() => import('../../pages/Login'));
const CreateProduct =lazy(()=>import('../../pages/admin/CreateProduct'));
const ProductDetails=lazy(()=>import ( '../../pages/admin/ProductDetails'));
const UserProfile =lazy(()=>import('../../pages/user/UserProfile'));
const PageNotFound=lazy(()=>import ( '../../pages/PageNotFound'));
// const AuthWrapper=lazy(()=>import ( './AuthWrapper '));
// const UnAuthWrapper=lazy(()=>import ( '../UnAuthWrapper'));

const Mainroutes = () => {
  return (
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product' element={<Product/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/admin/create-product' element={<CreateProduct/>}/>
    <Route path='/admin/user-profile' element={<UserProfile/>}/>
    <Route path='/product-details/:id' element={<ProductDetails/>}/>
    <Route path='*' element={<PageNotFound/>}/>
</Routes>
  )
}

export default Mainroutes