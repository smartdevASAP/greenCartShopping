import React from "react";
import ProductCard from "./productCard";
import { useAppContext } from "../context/AppContext";
function BestSeller() {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 mr-4 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BestSeller;
