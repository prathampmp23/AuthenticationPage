import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", { email, password });
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>SignUp</h1>
      </div>
      <form onSubmit={handleSignup}>
        <div className="content">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p>
            Already register <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
