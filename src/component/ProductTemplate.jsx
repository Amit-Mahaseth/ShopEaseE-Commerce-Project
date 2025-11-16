import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosUpdateUser } from "../store/actions/UserAction";
import toast from "react-hot-toast";

const ProductTemplate = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const user = Array.isArray(users) ? users[0] : users;

  const AddCartHandler = (product) => {
    if (!user || !user.id) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const copyUser = {
      ...user,
      cart: Array.isArray(user.cart) ? [...user.cart] : [],
    };

    const cartData = copyUser.cart.findIndex(
      (c) => c?.product?.id === product.id
    );
    if (cartData === -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[cartData] = {
        product,
        quantity: copyUser.cart[cartData].quantity + 1,
      };
    }

    dispatch(AxiosUpdateUser(copyUser.id, copyUser));
    toast.success("Added to cart");
  };

  const HandleClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      key={product.id}
    >
      {/* Product Image */}
      <div
        onClick={HandleClick}
        className="w-full h-52 flex items-center justify-center bg-gray-50 cursor-pointer group"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain p-4 transform group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h1 className="font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h1>
        <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
          {product.category}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto pt-3">
          <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
          <button
            onClick={() => AddCartHandler(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full shadow-md hover:shadow-blue-300 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate;
