
import React from 'react';

const WaterBillCard = ({ billAmount, dueDate }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-blue-500">Water Bill</h2>
        <p className="text-gray-700 mt-2">Amount Due: <span className="font-semibold">${billAmount}</span></p>
        <p className="text-gray-700 mt-1">Due Date: <span className="font-semibold">{dueDate}</span></p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default WaterBillCard;
// src/pages/Login.jsx