import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "student") {
      navigate("/student/login");
      return;
    }

    setCurrentUser(user);
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const studentIndex = students.findIndex(
      (s) => s.roll === currentUser.roll
    );

    if (studentIndex === -1) {
      alert("Student not found");
      return;
    }

    if (students[studentIndex].password !== oldPassword) {
      alert("Old password is incorrect");
      return;
    }

    students[studentIndex].password = newPassword;

    localStorage.setItem("students", JSON.stringify(students));

    alert("Password changed successfully!");

    navigate("/student-dashboard");
  };

  if (!currentUser) return null;

  return (
    <>
      <Navbar
        title="Change Password"
        onLogout={handleLogout}
      />

      <div className="dashboard">
        <div className="card">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;