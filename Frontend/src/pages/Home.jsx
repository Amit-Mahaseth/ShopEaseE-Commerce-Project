import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Truck, DollarSign, Headset, Lock, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.products);
  const homeProduct = products.slice(0, 4);

  const ShopHandler = () => {
    navigate("/product");
  };

  const renderProduct = homeProduct.map((product) => (
    <div
      className="w-full sm:w-[45%] md:w-[22%] rounded-md overflow-auto bg-white shadow-lg hover:scale-105 transition-transform duration-300"
      key={product.id}
    >
      <img
        className="w-full h-48 sm:h-56 md:h-60 object-cover rounded-t-md"
        src={product.image}
        alt={product.title}
      />
      <div className="p-4 flex flex-col gap-2">
        <h1 className="font-semibold text-base sm:text-lg md:text-lg">{product.title}</h1>
        <p className="text-[12px] w-fit px-3 py-1 rounded-full bg-gray-100 text-black text-xs sm:text-sm">
          {product.category}
        </p>
        <p className="text-[12px] sm:text-[13px] md:text-[14px] opacity-70">{product.description}</p>
        <div className="flex items-center justify-between text-blue-600 font-bold mt-2">
          <p className="text-sm sm:text-base">₹ {product.price}</p>
          <Link
            to={`/product-details/${product.id}`}
            className="bg-blue-500 rounded text-white px-3 py-1 sm:px-3 sm:py-2 font-thin hover:scale-105 transition-all cursor-pointer hover:bg-blue-600"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  ));

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "Free Shipping on all orders" },
    { icon: DollarSign, title: "Money Guarantee", desc: "100% money back after 3 days" },
    { icon: Headset, title: "24/7 Support", desc: "Customer support anytime" },
    { icon: Lock, title: "Secure Payment", desc: "All transactions secure" },
  ];

  return (
    <div className="w-full p-2 mt-10">
      {/* Hero Section */}
      <div className="w-full bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] rounded-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-12 text-white relative">
        <div className="md:w-1/2 flex flex-col gap-4 z-20">
          <span className="text-sm uppercase opacity-80">20% OFF</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">Discover Amazing Products</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-thin opacity-60">
            Shop the latest trends with unbeatable quality and prices
          </p>
          <button
            onClick={ShopHandler}
            className="px-5 py-3 rounded font-semibold bg-white text-blue-500 hover:bg-gray-100 transition-colors w-40 cursor-pointer hover:scale-95"
          >
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 hidden md:flex justify-center md:justify-end mt-6 md:mt-0 relative">
          <img
            src="https://imgs.search.brave.com/0EnonShm9NnIKDXNHnnPo1jiaX2QMucWN3g0IxqYAeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maWxl/LmFpcXVpY2tkcmF3/LmNvbS9pbWdjb21w/cmVzc2VkL2ltZy9j/b21wcmVzc2VkX2Y0/ODE0MDQzYTc2YjU1/MTE5MWViMmIzOGJk/NjczN2VmLndlYnA"
            alt="Hero Image"
            className="w-64 md:w-80 md:h-[55vh] object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 p-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Icon className="w-12 h-12 text-blue-500" />
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Featured Products */}
      <h1 className="text-3xl sm:text-4xl mt-10 text-center font-bold text-gray-700">
        Best Featured Products
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6 p-4 sm:p-7 md:p-10">
        {renderProduct}
      </div>

    
      <footer className="bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="flex flex-col gap-4 text-white">
            <h2 className="font-bold text-xl">About Us</h2>
            <p className="text-sm opacity-80">
              We provide the best products with amazing quality and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 text-white">
            <h2 className="font-bold text-xl">Quick Links</h2>
            <ul className="flex flex-col gap-2 text-sm opacity-90">
              <li className="hover:text-gray-900 cursor-pointer transition">Home</li>
              <li className="hover:text-gray-900 cursor-pointer transition">Shop</li>
              <li className="hover:text-gray-900 cursor-pointer transition">Products</li>
              <li className="hover:text-gray-900 cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 text-white">
            <h2 className="font-bold text-xl">Contact</h2>
            <p className="text-sm opacity-90">Email: shopease@gmail.com</p>
            <p className="text-sm opacity-90">Phone: +91 123 456 7890</p>
            <p className="text-sm opacity-90">Address: 123, Street, Bihar, india</p>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 text-white">
            <h2 className="font-bold text-xl">Follow Us</h2>
            <div className="flex gap-4">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-900 transition" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-900 transition" />
              <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-900 transition" />
              <Linkedin className="w-6 h-6 cursor-pointer hover:text-gray-900 transition" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm opacity-70 py-4 border-t border-white/20 text-white ">
          © 2025 ShopName. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
