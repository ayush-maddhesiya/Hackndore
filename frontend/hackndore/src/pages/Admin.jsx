import React, { useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const data = [
  { value: 5, label: "A" },
  { value: 10, label: "B" },
  { value: 15, label: "C" },
];

const size = {
  width: 400,
  height: 200,
};

function Admin() {
  const [ward, setWard] = useState("");
  const [wardDetails, setWardDetails] = useState(null);

  const fetchWardDetails = async () => {
    try {
      const response = await axios.get(`/api/wards/${ward}`);
      setWardDetails(response.data);
    } catch (error) {
      console.error("Error fetching ward details:", error);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="out-container w-11/12 mx-auto">
        <div className="flex flex-col py-10">
          <div className="w-full flex flex-col items-center mx-auto">
            <div className="flex justify-center items-center gap-4 py-5">
              <label htmlFor="ward" className="text-lg font-semibold">Ward No</label>
              <input
                type="text"
                name="ward"
                placeholder="Enter ward number"
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="bg-blue-300/30 p-2 rounded-md"
              />
              <button
                onClick={fetchWardDetails}
                className="bg-blue-600 rounded-lg text-white px-4 py-2"
              >
                Go
              </button>
            </div>
            
            {wardDetails && (
              <div className="flex flex-col items-center py-10">
                <h2 className="text-2xl font-bold mb-4">Ward Details</h2>
                <p>Population: {wardDetails.population}</p>
                <p>Area: {wardDetails.area} sq km</p>
                <p>Major Landmarks: {wardDetails.landmarks.join(", ")}</p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-10 py-10">
              <div className="flex flex-col justify-center items-center w-40 h-40">
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 1, md: 3 }}
                >
                  <Gauge
                    width={200}
                    height={150}
                    value={40}
                    valueMin={0}
                    valueMax={60}
                  />
                </Stack>
                <h1 className="text-center mt-2">Water Tax Payers</h1>
              </div>

              <div className="flex flex-col justify-center items-center w-40 h-40">
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 1, md: 3 }}
                >
                  <Gauge
                    width={200}
                    height={150}
                    value={50}
                    valueMin={10}
                    valueMax={60}
                  />
                </Stack>
                <h1 className="text-center mt-2">Property Tax Payers</h1>
              </div>

              <div className="flex flex-col justify-center items-center w-40 h-40">
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 1, md: 3 }}
                >
                  <Gauge
                    width={200}
                    height={100}
                    value={50}
                    valueMin={10}
                    valueMax={60}
                  />
                </Stack>
                <h1 className="text-center mt-2">Electricity Tax Payers</h1>
              </div>
            </div>
          </div>
          <div className="py-10 mx-auto">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
