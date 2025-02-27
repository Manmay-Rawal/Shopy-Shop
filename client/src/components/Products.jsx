import React, { useEffect, useState } from "react";
import Cart from "./Cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/1")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Product List */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Products List</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-contain mx-auto"
              />
              <p className="font-semibold mt-2">{product.title}</p>
              <p className="text-gray-700">Price: ${product.price}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Products;
