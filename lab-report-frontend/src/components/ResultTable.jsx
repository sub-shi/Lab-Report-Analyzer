import React from "react";

const ResultTable = ({ data }) => {
  const total = data.length;
  const normal = data.filter((r) => r.attention === "Normal").length;
  const abnormal = data.filter((r) => r.attention === "Needs Attention").length;
  const critical = 0; // Optional: implement logic for critical if needed

  return (
    <div className="mt-10">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 text-blue-700 border border-blue-200 p-4 rounded shadow">
          <p className="text-sm font-medium">Total Parameters</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded shadow">
          <p className="text-sm font-medium">Normal</p>
          <p className="text-2xl font-bold">{normal}</p>
        </div>
        <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 p-4 rounded shadow">
          <p className="text-sm font-medium">Needs Attention</p>
          <p className="text-2xl font-bold">{abnormal}</p>
        </div>
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded shadow">
          <p className="text-sm font-medium">Critical</p>
          <p className="text-2xl font-bold">{critical}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg shadow-md">
          <thead className="text-xs text-gray-100 uppercase bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3">Parameter</th>
              <th scope="col" className="px-6 py-3">Value</th>
              <th scope="col" className="px-6 py-3">Unit</th>
              <th scope="col" className="px-6 py-3">Reference Range</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap">{row.parameter}</td>
                <td className="px-6 py-4 font-semibold">{row.value}</td>
                <td className="px-6 py-4">{row.unit}</td>
                <td className="px-6 py-4">{row.range}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm border ${
                      row.attention === "Needs Attention"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : "bg-green-100 text-green-700 border-green-300"
                    }`}
                  >
                    {row.attention}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
