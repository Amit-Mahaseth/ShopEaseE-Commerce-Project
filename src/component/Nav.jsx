import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const { users } = useSelector((state) => state.userReducer);
  const cartCount = users?.cart?.length || 0;

  const [open, setOpen] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        setLastScrollY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

  return (
    <>
   <nav className={`fixed top-0 w-full left-0 z-50 bg-white shadow-lg transition-transform duration-300  
   ${
showNav ?"translate-y-0":"-translate-y-full"
   }`}>
        <div className="flex justify-between  items-center  px-6 py-4">
  
          <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
<div className="hidden md:flex gap-10 font-medium text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 px-3 py-2"
                  : "hover:text-blue-500 px-3 py-2"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 px-3 py-2"
                  : "hover:text-blue-500 px-3 py-2"
              }
            >
              Product
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "relative underline underline-offset-4 px-3 py-2"
                  : "relative hover:text-blue-500 px-3 py-2"
              }
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs font-semibold rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {users && users.Email ? (
              <>
                {users.isAdmin && (
                  <NavLink
                    to="/admin/create-product"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-4 px-3 py-2"
                        : "hover:text-blue-500 px-3 py-2"
                    }
                  >
                    Create Product
                  </NavLink>
                )}
                <NavLink
                  to="/admin/user-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 px-3 py-2"
                      : "hover:text-blue-500 px-3 py-2"
                  }
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 px-3 py-2"
                    : "hover:text-blue-500 px-3 py-2"
                }
              >
                Login
              </NavLink>
            )}
</div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700  hover:text-blue-600"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center   p-4 border-b">
            <h2 className="text-xl font-bold text-blue-600">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <X size={26} className="text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col gap-6 p-6 bg-gray-200 h-screen text-gray-700 font-medium">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/product" onClick={() => setOpen(false)}>
              Product
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)}>
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </NavLink>
            {users && users.Email ? (
              <>
                {users.isAdmin && (
                  <NavLink
                    to="/admin/create-product"
                    onClick={() => setOpen(false)}
                  >
                    Create Product
                  </NavLink>
                )}
                <NavLink
                  to="/admin/user-profile"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>
        )}
      </nav>
    </> 
  );
};

export default Nav;
