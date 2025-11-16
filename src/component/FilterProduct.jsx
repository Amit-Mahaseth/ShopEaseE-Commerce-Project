import React from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react'; // 🔍 Import search icon

const FilterProduct = ({ filters, setfilters }) => {
  const products = useSelector(state => state.productReducer.products);

  console.log(filters);

  return (
    <div className="flex flex-col w-full p-2">
      
        <h1 className="mb-4 font-semibold text-2xl text-blue-500">Filter</h1>

        <h1 className="mb-2">Category</h1>
        <select
          className="border-0 mb-2 bg-gray-100 w-full text-black shadow-lg rounded-lg px-3 py-1"
          value={filters.category}
          onChange={(e) => setfilters((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="All">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Electronics">Electronics</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Books & Media">Books & Media</option>
        </select>

        <h1>Price</h1>
        <select
          className="border-0 mb-2 bg-gray-100 text-black shadow-lg rounded-lg px-3 py-1"
          value={filters.price}
          onChange={(e) => setfilters((f) => ({ ...f, price: e.target.value }))}
        >
          <option value="All">All Price</option>
          <option value="0-1000">Below ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000+">Above ₹2000</option>
        </select>
      </div>

  );
};

export default FilterProduct;
