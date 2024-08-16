import React, { useEffect, useState } from "react";
import EmployeeScoresTable from "./EmployeeScoresTable";
import NavBar from "../Common/NavBar";
import { useAuth } from "../../contexts/AuthContext";
import { getTenantData, fetchAverageScores } from "../../utils/api";
import LoadingSpinner from "../Common/LoadingSpinner";

const MainDashboard = () => {
  const { user } = useAuth();
  const [tenantId, setTenantId] = useState(null);
  const [averageScores, setAverageScores] = useState({
    averageScore: 0,
    averagePossibleScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantId = async () => {
      if (user) {
        try {
          const tenantData = await getTenantData(user.id);
          setTenantId(tenantData.id);

          const avgScores = await fetchAverageScores(tenantData.id);
          setAverageScores({
            averageScore: Math.round(avgScores.averageScore),
            averagePossibleScore: Math.round(avgScores.averagePossibleScore),
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tenant ID or average scores:", error);
          setLoading(false);
        }
      }
    };

    fetchTenantId();
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        {/* Header / Title */}
        <div className="bg-blue-100 p-8 rounded shadow-md mb-8 text-center">
          <h1 className="text-4xl font-bold">
            Empower Your Workforce with Ultopia AI Enterprise
          </h1>
          <p className="text-xl mt-2 font-bold">
            Enhance employee holistic lifestyle and productivity with our
            AI-powered solutions
          </p>
        </div>

        {/* Total Average Section */}
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Ultopia Score: Measuring and Improving Employee Well-being
          </h3>
          <div className="mt-4">
            <h4 className="text-xl font-bold mb-2">
              Overall Company Lifestyle Score and Ultopia Index
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 p-4">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto text-center shadow-lg">
                    <p className="text-lg font-bold">
                      Average Lifestyle Score: {averageScores.averageScore}
                    </p>
                  </div>
                  <div className="bg-green-500 text-white p-4 rounded hover:bg-green-600 transition-colors duration-300 w-full md:w-auto text-center shadow-lg">
                    <p className="text-lg font-bold">
                      Average Ultopia Index:{" "}
                      {averageScores.averagePossibleScore}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bar graph and Pie chart */}
          <div className="flex flex-wrap justify-between mt-4">
            <div className="w-full md:w-1/2 p-2">
              <h4 className="text-xl font-bold mb-2">
                Employee Lifestyle Score
              </h4>
              <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
                [Bar Graph Placeholder]
              </div>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <h4 className="text-xl font-bold mb-2">Employee Engagement</h4>
              <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
                [Pie Chart Placeholder]
              </div>
            </div>
          </div>
        </div>

        {/* Employee Scores Table */}
        <div className="bg-white p-6 rounded shadow-md mb-8 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-4">
            Participating Employees and Their Scores
          </h3>
          {tenantId ? (
            <EmployeeScoresTable tenantId={tenantId} />
          ) : (
            <LoadingSpinner />
          )}
        </div>

        {/* Date Filter and Reporting */}
        <div className="bg-blue-200 p-6 rounded shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Analyze Past Data for Continuous Improvement
          </h3>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-2 relative">
              <label className="block text-lg font-medium">First Date:</label>
              <input
                type="date"
                className="w-full border rounded px-4 py-2 absolute bottom-0 left-0"
              />
            </div>
            <div className="w-full md:w-1/2 p-2 relative">
              <label className="block text-lg font-medium">Last Date:</label>
              <input
                type="date"
                className="w-full border rounded px-4 py-2 absolute bottom-0 left-0"
              />
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>

        {/* Employer Survey */}
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">Employer Survey</h3>
          <div className="mb-4">
            <label className="block text-lg font-medium">
              How has your team's productivity been in the last year?
            </label>
            <select className="w-full border rounded px-4 py-2">
              <option value="improved">Improved</option>
              <option value="declined">Declined</option>
              <option value="stayed_the_same">Stayed the same</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">
              Additional Comments:
            </label>
            <textarea className="w-full border rounded px-4 py-2"></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
