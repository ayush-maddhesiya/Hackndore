
import React from 'react';

const BillCard = ({ amount, month, ispaid  }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-blue-500">Water Bill</h2>
        <p className="text-gray-700 mt-2">Amount Due: <span className="font-semibold">${amount}</span></p>
        <p className="text-gray-700 mt-1">MONTH : <span className="font-semibold">{month}</span></p>
      </div>
      {!ispaid && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pay Now
        </button>
      )}
    </div>
  );
};

export default BillCard;
// src/pages/Login.jsx