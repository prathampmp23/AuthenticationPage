import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="">
      <h2 className="">Welcome to Dashboard 🎉</h2>

      <button
        onClick={handleLogout}
        className="btn"
      >
        Logout
      </button>
    </div>
  );
}
