import { useDispatch, useSelector } from 'react-redux';
import { AxiosUpdateUser } from '../store/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users); // may be single user or array
  const user = Array.isArray(users) ? users[0] : users; // normalize to single user
  const cart = user?.cart || [];

  const IncreaseQuantityHandler = (index, item) => {
    const copyUser = { ...user, cart: [...(user?.cart || [])] };
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1
    }
    dispatch(AxiosUpdateUser(copyUser.id, copyUser))
    toast.success(`Added one more  ${item.product.title}`)
  }

  const DecreaseQuantityHandler = (index, item) => {
    const copyUser = { ...user, cart: [...(user?.cart || [])] };
    if (user.cart[index].quantity > 1) {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1
      }
      toast.error(`Removed one ${item.product.title}`, { icon: "🛒" })
    } else {
      copyUser.cart.splice(index, 1)
      toast.error(`${item.product.title} Removed from cart`)
    }
    dispatch(AxiosUpdateUser(copyUser.id, copyUser))
  }

  const HandleCart = () => {
    navigate("/product");
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const cartItems = cart.filter((item) => item.product).map((item, index) => (
    <div
      key={item.product.id}
      className='flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg mt-5 p-4 sm:p-5 gap-4 sm:gap-6 w-full'
    >
      <img className='w-full sm:w-[150px] h-40 sm:h-36 object-cover rounded' src={item.product.image} alt={item.product.title} />
      <div className='w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4'>
        <div className='flex flex-col'>
          <p className='font-semibold'>{item.product.title}</p>
          <p className='text-blue-500 font-bold'>₹{item.product.price}</p>
        </div>

        <div className='flex items-center gap-2 bg-gray-100 rounded px-2 py-1'>
          <button className='bg-gray-300 px-2 rounded cursor-pointer hover:bg-gray-400' onClick={() => DecreaseQuantityHandler(index, item)}>-</button>
          <p className='font-bold'>{item.quantity}</p>
          <button className='bg-gray-300 px-2 rounded cursor-pointer hover:bg-gray-400' onClick={() => IncreaseQuantityHandler(index, item)}>+</button>
        </div>
        <p className='text-blue-500 font-bold text-lg'>₹{item.product.price * item.quantity}</p>
      </div>
    </div>
  ));

  return (
    <div className='min-h-screen bg-gradient-to-br mt-20 from-blue-50 to-white py-6 px-4 sm:px-6 md:px-12'>
      <Toaster position="top-center" reverseOrder={false} />

      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-500'>My Cart 🛒</h1>
        <button
          onClick={HandleCart}
          className='border px-5 py-2 flex items-center gap-3 rounded-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all'
        >
          <i className="fa-solid fa-arrow-left"></i> Continue Shopping
        </button>
      </div>

      {cartItems.length > 0 ? (
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex-1'>{cartItems}</div>

          <div className='bg-white shadow-lg rounded-lg p-5 w-full lg:w-1/3 h-[50vh] flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>Order Summary</h2>
            <hr />
            <div className='flex justify-between'>
              <div className='text-gray-500'>
                <p>Items:</p>
                <p>Subtotal:</p>
                <p>Shipping:</p>
              </div>
              <div className='text-right'>
                <p>{cart.length}</p>
                <p>₹{totalPrice.toFixed(2)}</p>
                <p className='text-green-500'>Free</p>
              </div>
            </div>
            <hr />
            <div className='flex justify-between mt-4'>
              <h3 className='font-bold'>Total:</h3>
              <p className='text-blue-500 font-bold text-lg'>₹{totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={() => {
                if (!user || !user.id) {
                  toast.error('Please login to proceed to checkout');
                  navigate('/login');
                  return;
                }
                toast.success('✅ Proceeding to checkout...');
              }}
              className='bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 hover:scale-95 transition-all w-full'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-20 gap-4 text-center'>
          <i className="fas fa-cart-plus text-9xl opacity-10"></i>
          <p className='text-xl font-semibold'>Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
