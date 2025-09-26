import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ education: "", employment: "" });

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setProfile(res.data);
        setForm({ education: res.data.education, employment: res.data.employment });
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/profile", form);
      setProfile(res.data);
      toast.success("Profile saved!");
    } catch {
      toast.error("Error saving profile");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSave} className="space-y-2">
        <input className="w-full p-2 border" placeholder="Education"
          value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
        <input className="w-full p-2 border" placeholder="Employment"
          value={form.employment} onChange={(e) => setForm({ ...form, employment: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
      {profile && (
        <div className="mt-4 p-4 border rounded">
          <p><b>Name:</b> {profile.user?.name}</p>
          <p><b>Email:</b> {profile.user?.email}</p>
        </div>
      )}
    </div>
  );
}
