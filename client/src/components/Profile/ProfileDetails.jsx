import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import NavBar from "../Common/NavBar";
import { getTenantData, updateTenantData } from "../../utils/api";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    username: "",
    email: user?.email || "",
  });

  const [tenantData, setTenantData] = useState({
    company_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    domains: [],
  });

  const [newDomain, setNewDomain] = useState("");
  const [domainError, setDomainError] = useState("");

  useEffect(() => {
    const fetchTenantData = async () => {
      if (!user) return;

      try {
        const tenantData = await getTenantData(user.id);
        setTenantData(tenantData);
        setUserData((prevUserData) => ({
          ...prevUserData,
          username: user.email.split("@")[0],
          email: user.email,
        }));
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchTenantData();
  }, [user]);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "tenant") {
      setTenantData((prevTenantData) => ({ ...prevTenantData, [name]: value }));
    }
  };

  const validateDomain = (domain) => {
    const domainPattern = /^@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  };

  const handleAddDomain = () => {
    if (newDomain && validateDomain(newDomain)) {
      setTenantData((prevTenantData) => ({
        ...prevTenantData,
        domains: [...prevTenantData.domains, newDomain],
      }));
      setNewDomain("");
      setDomainError("");
    } else {
      setDomainError("Invalid domain format. Please use @example.com format.");
    }
  };

  const handleRemoveDomain = (index) => {
    const updatedDomains = tenantData.domains.filter((_, i) => i !== index);
    setTenantData((prevTenantData) => ({ ...prevTenantData, domains: updatedDomains }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTenantData(tenantData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Profile Page</h1>
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="flex items-center justify-center mb-6">
            <img
              src={userData.avatar}
              alt="Avatar"
              className="rounded-full h-32 w-32"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              className="w-full border rounded px-4 py-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="w-full border rounded px-4 py-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={tenantData.company_name}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Address Line 1</label>
            <input
              type="text"
              name="address_line1"
              value={tenantData.address_line1}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="Address Line 1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Address Line 2</label>
            <input
              type="text"
              name="address_line2"
              value={tenantData.address_line2}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="Address Line 2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">City</label>
            <input
              type="text"
              name="city"
              value={tenantData.city}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="City"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">State</label>
            <input
              type="text"
              name="state"
              value={tenantData.state}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="State"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              value={tenantData.postal_code}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="Postal Code"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={tenantData.country}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="Country"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={tenantData.phone_number}
              onChange={(e) => handleInputChange(e, "tenant")}
              className="w-full border rounded px-4 py-2"
              placeholder="Phone Number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Domains</label>
            <div className="flex items-center">
              <input
                type="text"
                name="new_domain"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="w-full border rounded px-4 py-2"
                placeholder="Add a domain (e.g. @example.com)"
              />
              <button
                type="button"
                onClick={handleAddDomain}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            {domainError && (
              <p className="text-red-500 text-sm mt-2">{domainError}</p>
            )}
            <div className="mt-2">
              {tenantData.domains.map((domain, index) => (
                <div
                  key={index}
                  className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
                >
                  {domain}
                  <button
                    type="button"
                    onClick={() => handleRemoveDomain(index)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
