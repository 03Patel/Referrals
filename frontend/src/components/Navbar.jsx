import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Job Referral</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/referrals">Referrals</Link>
            <button
              onClick={logout}
              className="ml-4 bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
