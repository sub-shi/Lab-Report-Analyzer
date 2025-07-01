import React, { useState } from 'react';
import { uploadReport } from './Api';
import ResultTable from './components/ResultTable';
import TrendChart from './components/TrendChart';

const Upload = ({ token }) => {                     // Component to handle file upload and display results
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [trends, setTrends] = useState({});
  const [loading, setLoading] = useState(false);
 
  const handleUpload = async () => {                                
    if (!file) return alert('Please select a file');
    setLoading(true);
    try {
      const data = await uploadReport(file, token);
      console.log("Backend response:", data);
      setResults(data.table || []);
      setTrends(data.trends || {});
    } catch (err) {
      alert('Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-12 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">LabAnalyzer</h1>
          <p className="text-xs text-gray-500">Health Report Intelligence</p>
        </div>
      </header>

      <section className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Upload Your Lab Report</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Drag and drop your PDF or image report or click the button below to browse your file. Supported formats: PDF, JPG, PNG (Max 10MB)
        </p>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-8 text-center border border-gray-200">
        <div className="mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mx-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </section>

      {results.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Extracted Health Parameters</h3>
          <ResultTable data={results} />
        </section>
      )}

      {Object.keys(trends).length > 0 && (
        <section className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Parameter Trends</h3>
          <TrendChart trends={trends} />
        </section>
      )}
    </div>
  );
};

export default Upload;
