// src/pages/Messages.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Messages({ selectedUserId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedUserId) {
      API.get(`/messages/${selectedUserId}`).then((res) => setMessages(res.data));
    }
  }, [selectedUserId]);

  const sendMessage = async () => {
    if (!text) return;
    const res = await API.post("/messages", {
      receiverId: selectedUserId,
      text,
    });
    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-4">💬 Messages</h2>
      <div className="h-64 overflow-y-auto mb-4 border p-3 rounded">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`p-2 mb-2 rounded ${
              m.sender === selectedUserId
                ? "bg-gray-200 text-left"
                : "bg-indigo-100 text-right"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
