import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleCheckboxChange(event) {
    setRememberMe(event.target.checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(formData.email, formData.password, rememberMe);
    if (success) {
      navigate("/dashboard");
    } else {
      setLocalError(
        "Login failed. Please check your credentials and try again."
      );
    }
  }

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Logo and Text */}
      <div className="flex flex-1 flex-col justify-center bg-white p-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img
            src="/UltopiaLogo.png"
            alt="Ultopia AI Logo"
            className="w-96 mb-4"
          />
          <h1 className="text-4xl font-bold text-blue-900">ENTERPRISE</h1>
        </div>
        <p className="text-center text-3xl font-bold text-blue-900 mt-auto mb-4">
          BreatheIT Solutions, Inc.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-blue-50 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-blue-500 mb-8">
            Login To Your Account
          </h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center mb-3 focus:outline-none"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon className="h-6 w-6 text-gray-700 md:h-5 md:w-5" />
                    ) : (
                      <VisibilityIcon className="h-6 w-6 text-gray-700 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
              </div>
              {(localError || error) && (
                <div className="text-red-500 text-sm mb-4">
                  Login failed. Please check your credentials and try again.
                </div>
              )}
              <div className="flex items-center justify-center mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-gray-700 text-sm">Remember</span>
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="text-center text-gray-500 text-xs mt-4">
            &copy;2024 BreatheIT Solutions, Inc. All rights reserved.
            <div className="mt-2">
              <a
                href="https://breatheitfoundation.com/terms-of-service"
                target="_blank"
                className="text-blue-500 hover:text-blue-800"
              >
                Terms of Service
              </a>
              <span className="mx-2">|</span>
              <a
                href="https://breatheitfoundation.com/privacy-policy"
                target="_blank"
                className="text-blue-500 hover:text-blue-800"
              >
                Privacy Statement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
