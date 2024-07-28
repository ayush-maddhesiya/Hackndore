import React, { useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import avatar from "../assets/avatar.jpg";
import { useLocation } from "react-router-dom";

function User() {
  const location = useLocation();
  const { state } = location;
  const { userData } = state;

  const userDetails = {
    aadhar: userData.data.user.aadhar,
    pan: userData.data.user.pan,
    email: userData.data.user.email,
    mobile: userData.data.user.mobile,
    fullName: userData.data.user.fullName,
    address: "indore",
  };

  const [garbageData, setGarbageData] = useState(null);
  const [waterData, setWaterData] = useState(null);
  const [isGarbageTableVisible, setIsGarbageTableVisible] = useState(false);
  const [isWaterTableVisible, setIsWaterTableVisible] = useState(false);

  const garbageHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/garbage/getGarbageTaxById?id=66a46664e2a9c696318a1cef"
      );
      if (response.data.statusCode === 200) {
        setGarbageData(response.data.data);
        setIsGarbageTableVisible(true);
        console.log("Garbage tax data retrieved successfully:", response.data.data);
      } else {
        console.log("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  };

  const waterHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/water/getWaterTaxById?id=66a458bd870e5d20d201672a"
      );
      if (response.data.statusCode === 200) {
        setWaterData(response.data.data);
        setIsWaterTableVisible(true);
        console.log("Water tax data retrieved successfully:", response.data.data);
      } else {
        console.log("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  };

  const closeGarbageTable = () => {
    setIsGarbageTableVisible(false);
  };

  const closeWaterTable = () => {
    setIsWaterTableVisible(false);
  };

  const payNowHandler = (billId) => {
    // Implement your pay now logic here, for example, updating the isPaid status or redirecting to a payment page.
    console.log(`Pay Now clicked for bill ID: ${billId}`);
  };

  return (
    <>
      <Navbar2 />
      <div className="h-full">
        <div className="out-container w-11/12 mx-auto">
          <div className="flex bg-white py-10 flex-col w-3/5">
            <h1 className="text-center capitalize py-10 px-2 font-bold text-xl">
              User Details
            </h1>
            <div className="flex justify-between px-4">
              <table className="bg-white rounded-lg shadow-lg w-1/2">
                <tbody>
                  {Object.entries(userDetails).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="p-4 font-semibold capitalize">{key}</td>
                      <td className="p-4">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="shadow h-64">
                <img
                  src={avatar}
                  className="h-64 w-60 rounded-xl self-start"
                  alt=""
                />
              </div>
              
            </div>
          </div>

          <div className="my-4">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={garbageHandler}>
              GET GARBAGE TAX
            </button>
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={waterHandler}>
              GET WATER TAX
            </button>
          </div>

          {isGarbageTableVisible && garbageData && (
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Garbage Tax Details</h2>
                <button className="text-red-600 font-bold" onClick={closeGarbageTable}>
                  Close
                </button>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Bill Number</th>
                    <th className="py-2 px-4 border-b">Month</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Is Paid</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {garbageData.billinfo.map((bill) => (
                    <tr key={bill._id}>
                      <td className="py-2 px-4 border-b">{bill.billNumber}</td>
                      <td className="py-2 px-4 border-b">{bill.month}</td>
                      <td className="py-2 px-4 border-b">{bill.amount}</td>
                      <td className="py-2 px-4 border-b">{bill.isPaid ? 'Yes' : 'No'}</td>
                      <td className="py-2 px-4 border-b">
                        {!bill.isPaid && (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => payNowHandler(bill._id)}
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isWaterTableVisible && waterData && (
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Water Tax Details</h2>
                <button className="text-red-600 font-bold" onClick={closeWaterTable}>
                  Close
                </button>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Bill Number</th>
                    <th className="py-2 px-4 border-b">Month</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Is Paid</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {waterData.billinfo.map((bill) => (
                    <tr key={bill._id}>
                      <td className="py-2 px-4 border-b">{bill.billNumber}</td>
                      <td className="py-2 px-4 border-b">{bill.month}</td>
                      <td className="py-2 px-4 border-b">{bill.amount}</td>
                      <td className="py-2 px-4 border-b">{bill.isPaid ? 'Yes' : 'No'}</td>
                      <td className="py-2 px-4 border-b">
                        {!bill.isPaid && (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => payNowHandler(bill._id)}
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
