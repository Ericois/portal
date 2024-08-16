// client/src/components/Dashboard/EmployeeScoresTable.jsx
import React, { useEffect, useState } from 'react';
import { fetchEmployeeScores } from '../../utils/api';

const EmployeeScoresTable = ({ tenantId }) => {
  const [scores, setScores] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployeeScores(tenantId);
        setScores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError('Failed to load employee scores');
      }
    };

    fetchData();
  }, [tenantId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const displayedScores = showAll ? scores : scores.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Employee Scores</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Lifestyle Score</th>
            <th className="py-2 text-left">Ultopia Index</th>
          </tr>
        </thead>
        <tbody>
          {displayedScores.map((score) => (
            <tr key={score.user_id} className="border-t">
              <td className="py-2 text-left">{score.email}</td>
              <td className="py-2 text-left">{score.total_score_per}</td>
              <td className="py-2 text-left">{score.total_possible_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {scores.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showAll ? 'Show Less' : 'See More'}
        </button>
      )}
    </div>
  );
};

export default EmployeeScoresTable;
