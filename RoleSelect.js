import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student");

  const handleContinue = () => {
    if (selectedRole === "admin") {
      navigate("/admin/login");
    } else if (selectedRole === "faculty") {
      navigate("/faculty/login");
    } else {
      navigate("/student/login");
    }
  };

  // ✅ Back function added
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Select Your Role</h1>

        <div className="role-container">
          <div
            className={
              selectedRole === "admin" ? "role-card active" : "role-card"
            }
            onClick={() => setSelectedRole("admin")}
          >
            Admin
          </div>

          <div
            className={
              selectedRole === "faculty" ? "role-card active" : "role-card"
            }
            onClick={() => setSelectedRole("faculty")}
          >
            Faculty
          </div>

          <div
            className={
              selectedRole === "student" ? "role-card active" : "role-card"
            }
            onClick={() => setSelectedRole("student")}
          >
            Student
          </div>
        </div>

        <button onClick={handleContinue}>Continue</button>

        {/* ✅ Back Button Inside Main Div */}
        <button onClick={handleBack} className="back-btn">
          Back
        </button>
      </div>
    </div>
  );
}

export default RoleSelect;