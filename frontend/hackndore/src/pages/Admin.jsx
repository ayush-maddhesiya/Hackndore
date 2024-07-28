import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import wardData from "../../public/data.js"; // Adjust the path as needed

const data = [
  { label: "Property", value: 30 },
  { label: "Water", value: 20 },
  { label: "Garbage", value: 10 },
]; // Example data for PieChart, replace with actual data

const size = { width: 400, height: 400 };

function Admin() {
  const [wardNumber, setWardNumber] = useState("");
  const [selectedWard, setSelectedWard] = useState(null);

  const fetchWardDetails = () => {
    const ward = wardData.find(w => w.wardNumer === parseInt(wardNumber));
    setSelectedWard(ward);
  };

  return (
    <>
      <Navbar2 />
      <div className="out-container w-11/12 mx-auto flex py-10">
        <div className="flex flex-col w-2/3">
          <div className="flex flex-col items-center py-5">
            <div className="flex justify-center items-center gap-4 py-5">
              <label htmlFor="ward" className="text-lg font-semibold">Ward No</label>
              <input
                type="text"
                name="ward"
                placeholder="Enter ward number"
                id="ward"
                value={wardNumber}
                onChange={(e) => setWardNumber(e.target.value)}
                className="bg-blue-300/30 p-2 rounded-md"
              />
              <button
                onClick={fetchWardDetails}
                className="bg-blue-600 rounded-lg text-white px-4 py-2"
              >
                Go
              </button>
            </div>

            {selectedWard && (
              <div className="w-full">
                <div className="flex flex-col items-center py-10">
                  <h2 className="text-2xl font-bold mb-4">Ward Details</h2>
                  <p>Ward Number: {selectedWard.wardNumer}</p>
                  <p>Parshad: {selectedWard.parshad}</p>
                  <p>Number of Properties: {selectedWard.noOfProperty}</p>
                  <p>Number of Water Connections: {selectedWard.noOfWater}</p>
                  <p>Number of Garbage Connections: {selectedWard.noOfGarbage}</p>
                  <p>Paid Property Tax: {selectedWard.paidTaxProperty}</p>
                  <p>Paid Water Tax: {selectedWard.paidTaxWater}</p>
                  <p>Paid Garbage Tax: {selectedWard.paidTaxGarbage}</p>
                  <p>Ward Name: {selectedWard.wardName}</p>
                </div>

                <div className="flex justify-around w-full py-10">
                  <div className="flex flex-col justify-center items-center">
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={{ xs: 1, md: 3 }}
                    >
                      <Gauge
                        width={200}
                        height={150}
                        value={selectedWard.paidTaxWater}
                        valueMin={0}
                        valueMax={selectedWard.noOfWater}
                      />
                    </Stack>
                    <h1 className="text-center mt-2">Water Tax Payers</h1>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={{ xs: 1, md: 3 }}
                    >
                      <Gauge
                        width={200}
                        height={150}
                        value={selectedWard.paidTaxProperty}
                        valueMin={0}
                        valueMax={selectedWard.noOfProperty}
                      />
                    </Stack>
                    <h1 className="text-center mt-2">Property Tax Payers</h1>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={{ xs: 1, md: 3 }}
                    >
                      <Gauge
                        width={200}
                        height={150}
                        value={selectedWard.paidTaxGarbage}
                        valueMin={0}
                        valueMax={selectedWard.noOfGarbage}
                      />
                    </Stack>
                    <h1 className="text-center mt-2">Garbage Tax Payers</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed w-1/3 right-0 top-20">
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            {...size}
          />
          <h1 className="text-center mt-4">Tax Distribution</h1>
        </div>
      </div>
    </>
  );
}

export default Admin;
