import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });

  const fetchReferrals = async () => {
    const res = await API.get("/referrals");
    setReferrals(res.data);
  };

  useEffect(() => { fetchReferrals(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/referrals", form);
      toast.success("Referral created!");
      setForm({ title: "", company: "", description: "" });
      fetchReferrals();
    } catch {
      toast.error("Error creating referral");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Referrals</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input className="w-full p-2 border" placeholder="Title"
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 border" placeholder="Company"
          value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <textarea className="w-full p-2 border" placeholder="Description"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>
      <ul>
        {referrals.map((r) => (
          <li key={r._id} className="p-3 border-b">
            <h3 className="font-semibold">{r.title} at {r.company}</h3>
            <p>{r.description}</p>
            <p className="text-sm text-gray-600">Status: {r.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
