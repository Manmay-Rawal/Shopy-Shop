import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="w-1/3 border-l border-gray-300 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item, index) => (
            <li key={index} className="bg-white p-2 rounded-lg shadow">
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-700">Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
