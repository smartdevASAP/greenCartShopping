import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/productCard";

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteresProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteresProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteresProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filteredProducts
          .filter((product, key) => product.inStock)
          .map((product, id) => (
            <ProductCard key={id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
