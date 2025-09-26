import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Referrals from "./pages/Referrals";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/messages" element={<Messages />} />
           <Route path="/profile" element={<Profile />} />
            <Route path="/referrals" element={<Referrals />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
