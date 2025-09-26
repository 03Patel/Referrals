import { useEffect, useState } from "react";
import API from "../api/axios";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    API.get("/profile").then((res) => setProfile(res.data)).catch(() => {});
    API.get("/referrals").then((res) => setReferrals(res.data)).catch(() => {});
  }, []);

  const handleSearch = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    const res = await API.get(`/referrals/search?${query}`);
    setReferrals(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await API.put(`/referrals/${id}/status`, { status: newStatus });
    setReferrals((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">📊 Dashboard</h2>

      {profile && (
        <div className="mb-8 bg-white shadow-lg rounded-2xl p-6 border">
          <h3 className="text-xl font-semibold mb-3">👤 Profile</h3>
          <p className="text-lg font-medium">{profile.user?.name}</p>
          <p className="text-gray-500">{profile.user?.email}</p>
          <div className="mt-3">
            <span className="mr-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              {profile.education}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {profile.employment}
            </span>
          </div>
        </div>
      )}

      <SearchBar onSearch={handleSearch} />

      <div>
        <h3 className="text-2xl font-semibold mb-4">📌 My Referrals</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {referrals.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-xl shadow border relative"
            >
              <h4 className="text-lg font-bold">{r.title}</h4>
              <p className="text-gray-600">{r.company}</p>
              <p className="text-sm text-gray-500 mt-1">{r.description}</p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    r.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : r.status === "closed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>

                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r._id, e.target.value)}
                  className="ml-auto border p-1 rounded text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
