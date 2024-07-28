import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    pan: "",
    aadhar: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const clickhandler = () => {
    axios.post("http://localhost:3000/api/v1/users/login", formData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          // Store tokens in localStorage or a secure storage method
        //   localStorage.setItem('accessToken', response.data.data.accessToken);
        //   localStorage.setItem('refreshToken', response.data.data.refreshToken);
          
          // Store user data if needed
        //   localStorage.setItem('userData', JSON.stringify(response.data.data.user));
  
        //   console.log("Login successful, navigating to /user");
          navigate("/user", { state: { userData: response.data } });
        } else {
          console.log("Unexpected response:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response) {
          console.log("Error data:", error.response.data);
        }
      });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="pan" className="text-base font-medium">
                  PAN
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="PAN"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="aadhar" className="text-base text-white font-bold">
                  AADHAR
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="AADHAR"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={clickhandler}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
