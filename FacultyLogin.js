import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

function FacultyLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const enteredUsername = username.trim();
    const enteredPassword = password.trim();

    const facultyList =
      JSON.parse(localStorage.getItem("faculties")) || [];

    if (facultyList.length === 0) {
      alert("No faculty registered yet!");
      return;
    }

    const validUser = facultyList.find(
      (f) =>
        f.username === enteredUsername &&
        f.password === enteredPassword
    );

    if (validUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: validUser.id,
          username: validUser.username,
          course: validUser.course,
          role: validUser.role,
        })
      );

      // ✅ Correct dashboard route
      navigate("/faculty/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Faculty Login</h2>

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

        {/* ✅ NEW REGISTER BUTTON */}
        <button
          onClick={() => navigate("/faculty/register")}
          style={{ marginTop: "10px" }}
        >
          New Faculty? Register
        </button>

        <button
          onClick={() => navigate("/")}
          style={{ marginTop: "10px" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default FacultyLogin;