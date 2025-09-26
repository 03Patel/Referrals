// src/pages/Feed.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    API.get("/referrals/feed").then((res) => setFeed(res.data));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">🌍 Public Referral Feed</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((r) => (
          <div key={r._id} className="bg-white shadow rounded-xl p-5 border">
            <h3 className="font-bold text-lg">{r.title}</h3>
            <p className="text-gray-600">{r.company}</p>
            <p className="text-sm text-gray-500">{r.description}</p>
            <p className="text-xs mt-2 text-gray-400">
              Posted by {r.user?.name} ({r.user?.email})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
