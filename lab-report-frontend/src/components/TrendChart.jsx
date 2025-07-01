import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const TrendChart = ({ trends }) => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(trends).map(([parameter, data]) => (
          <div
            key={parameter}
            className="bg-white border border-gray-200 rounded-lg shadow p-4"
          >
            <h4 className="text-md font-semibold text-blue-700 mb-2">
              {parameter}
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendChart;
