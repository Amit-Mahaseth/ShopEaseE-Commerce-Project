import { lazy, Suspense, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UseInfiniteProduct from "./utils/UseInfiniteProduct";
import FilterProduct from "../component/FilterProduct";
import { Toaster } from "react-hot-toast";
import { Search, SlidersHorizontal } from "lucide-react";

const ProductTemplate = lazy(() => import("../component/ProductTemplate"));

const Product = () => {
  const { products, hasmore, FetchProduct } = UseInfiniteProduct();

  const [filters, setfilters] = useState({
    category: "All",
    price: "All",
    search: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  const FilteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !filters.search ||
        p.title.toLowerCase().includes(filters.search.toLowerCase());

      const matchCategory =
        filters.category === "All" ||
        p.category.toLowerCase().trim() === filters.category.toLowerCase().trim();

      const matchPrice =
        filters.price === "All" ||
        (filters.price === "0-1000" && p.price <= 1000) ||
        (filters.price === "1000-2000" && p.price > 1000 && p.price <= 2000) ||
        (filters.price === "2000+" && p.price > 2000);

      return matchCategory && matchPrice && matchSearch;
    });
  }, [products, filters]);

  return (
    <div className="flex flex-col md:flex-row mt-24  p-10 w-full px-4 md:px-8 gap-6">
      {/* Sidebar (Filter) */}
   
      <div
      
        className={`${
          showFilter ? "block" : "hidden"
        }
        
         md:block md:w-1/5 bg-white/50 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-md sticky top-24 h-fit`}
      >
        <FilterProduct filters={filters} setfilters={setfilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Search Bar & Filter Toggle */}
        
        <div className="flex items-center justify-between mb-6">
          
          <div className="relative w-full md:w-2/3 mx-auto z-0">
          
    <i class="fa-solid fa-magnifying-glass top-4 left-3 absolute z-10 text-center text-gray-600 text-1xl  "></i>
            
            <input
              type="text"
              placeholder="Search for amazing products..."
              value={filters.search}
              onChange={(e) => setfilters({ ...filters, search: e.target.value })}
              className="w-full py-2.5 pl-10 pr-4 rounded-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden ml-3 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Product Grid */}
        <InfiniteScroll
          dataLength={FilteredProducts.length}
          next={FetchProduct}
          hasMore={hasmore}
          loader={
            <h4 className="text-center py-4 text-gray-500 animate-pulse">
              Loading more products...
            </h4>
          }
        >
          <Toaster position="top-center" reverseOrder={false} />
          {FilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {FilteredProducts.map((product, index) => (
                <Suspense key={`${product.id}-${index}`}>
                  <ProductTemplate product={product} />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                alt="no products"
                className="w-24 opacity-70 mb-3"
              />
              <p>No products match your filters.</p>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Product;
