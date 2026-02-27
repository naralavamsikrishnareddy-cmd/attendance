import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (student) =>
        student.username === username.trim() &&
        student.password === password.trim()
    );

    if (foundStudent) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          role: "student",
          roll: foundStudent.roll,
          name: foundStudent.name,
          course: foundStudent.course,
        })
      );

      // ✅ FIXED ROUTE
      navigate("/student/dashboard");
    } else {
      alert("Invalid Student Credentials");
    }
  };

  const handleForgotPassword = () => {
    if (!username) {
      alert("Enter Username (Roll No) first");
      return;
    }

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (student) => student.username === username.trim()
    );

    if (foundStudent) {
      alert(`Your Password is: ${foundStudent.password}`);
    } else {
      alert("Student not found");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Student Login</h2>

        <input
          type="text"
          placeholder="Username (Roll No)"
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

        <button
          onClick={handleForgotPassword}
          style={{ marginTop: "10px" }}
        >
          Forgot Password
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

export default StudentLogin;