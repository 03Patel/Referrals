// src/components/SearchBar.jsx
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onSearch({ title, company, status });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-40"
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="border p-2 rounded w-40"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-40"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="closed">Closed</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
