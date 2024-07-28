import React, { useState, useCallback } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDropzone } from "react-dropzone";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 40.73061,
  lng: -73.935242,
};

function ReportIrregularities() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
    libraries,
  });

  const [formData, setFormData] = useState({
    ownerName: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    wardNo: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  }, [formData]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocodeData = await getGeocode(lat, lng);

    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
      address: geocodeData,
    });
  };

  const getGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      return response.data.results[0].formatted_address;
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate a successful form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Submission successful. Please fill in another response.");

      // Reset form data
      setFormData({
        ownerName: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        wardNo: "",
        image: null,
      });
    } catch (error) {
      console.error("Error reporting irregularity:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <>
      <Navbar2 />
      <div className="out-container w-11/12 mx-auto">
        <div className="flex flex-col py-10">
          <h2 className="text-2xl font-bold text-center mb-6">Report Property Irregularities</h2>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span>{successMessage}</span>
              <button
                onClick={closeSuccessMessage}
                className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="ownerName" className="block text-lg font-medium mb-2">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                id="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="wardNo" className="block text-lg font-medium mb-2">
                Ward Number
              </label>
              <input
                type="text"
                name="wardNo"
                id="wardNo"
                value={formData.wardNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Upload Image</label>
              <div {...getRootProps({ className: "dropzone" })} className="border-dashed border-2 border-gray-300 p-4 rounded-lg">
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
              </div>
              {formData.image && <p>Selected file: {formData.image.name}</p>}
            </div>
            <div className="mb-4">
              <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                onClick={handleMapClick}
              >
                {formData.latitude && formData.longitude && (
                  <Marker position={{ lat: formData.latitude, lng: formData.longitude }} />
                )}
              </GoogleMap>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReportIrregularities;
