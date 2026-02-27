import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          role: "admin",
          username: "admin"
        })
      );

      navigate("/admin/dashboard");

    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <button onClick={() => navigate("/role-select")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;