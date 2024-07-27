import React from "react";
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
  return (
    <>
      <Navbar2 />
      <div className="out-container w-11/12 mx-auto ">
        <div className="flex py-20">
          <div className="w-4/5 flex flex-col   mx-auto ">
            <div className="flex justify-center items-center gap-2 ">
              <label htmlFor="ward"> WARD NO</label>
              <input
                type="text"
                name="ward"
                placeholder="select ward "
                id="ward"
                className="bg-blue-300/30"
              />
              <button className="bg-blue-600 rounded-lg text-white w-10">
                {" "}
                go
              </button>
            </div>

            <div className="flex flex-wrap py-20">
              <div className="flex flex-col justify-center items-center w-40 h-40">
                <div>
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
                </div>
                <h1>people paying water tax </h1>
              </div>

              <div className="flex flex-col justify-center items-center w-40 h-40">
                <div>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1, md: 3 }}
                  >
                    <Gauge
                      width={100}
                      height={100}
                      value={50}
                      valueMin={10}
                      valueMax={60}
                    />
                  </Stack>
                </div>
                <h1>people paying water tax </h1>
              </div>

              <div className="flex flex-col justify-center items-center w-40 h-40">
                <div>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1, md: 3 }}
                  >
                    <Gauge
                      width={100}
                      height={100}
                      value={50}
                      valueMin={10}
                      valueMax={60}
                    />
                  </Stack>
                </div>
                <h1>people paying water tax </h1>
              </div>
            </div>
          </div>
          <div className="py-20">
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
