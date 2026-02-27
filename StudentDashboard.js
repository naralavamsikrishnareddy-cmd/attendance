import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function StudentDashboard() {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(null);

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "student") {
      navigate("/student/login"); // ⚠ make sure this matches App.js route
      return;
    }

    const storedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = storedStudents.find(
      (s) => s.roll === user.roll
    );

    if (!foundStudent) {
      navigate("/student/login");
      return;
    }

    setCurrentStudent(foundStudent);
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!currentStudent) return <p>Loading...</p>;

  const attendance = currentStudent.attendance || {};

  let overallTotal = 0;
  let overallPresent = 0;

  const courseRows = Object.keys(attendance).map((course) => {
    const total = attendance[course].total;
    const present = attendance[course].present;
    const percentage =
      total === 0
        ? 0
        : ((present / total) * 100).toFixed(2);

    overallTotal += total;
    overallPresent += present;

    return (
      <tr key={course}>
        <td>{course}</td>
        <td>{total}</td>
        <td>{present}</td>
        <td>{percentage}%</td>
      </tr>
    );
  });

  const overallPercentage =
    overallTotal === 0
      ? 0
      : ((overallPresent / overallTotal) * 100).toFixed(2);

  return (
    <>
      <Navbar
        title="Student Dashboard"
        onLogout={handleLogout}
      />

      <div className="dashboard">

        <div className="card">
          <h3>Student Info</h3>
          <p><strong>Roll:</strong> {currentStudent.roll}</p>
          <p><strong>Name:</strong> {currentStudent.name}</p>
          <p><strong>Course:</strong> {currentStudent.course}</p>

          {/* ✅ Change Password Button inside card */}
          <button
            style={{ marginTop: "10px" }}
            onClick={() =>
              navigate("/student/change-password")
            }
          >
            Change Password
          </button>
        </div>

        <div className="card">
          <h3>Attendance Details</h3>

          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Percentage</th>
              </tr>
            </thead>

            <tbody>
              {courseRows.length > 0 ? (
                courseRows
              ) : (
                <tr>
                  <td colSpan="4">No Attendance Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Overall Attendance</h3>

          <table>
            <thead>
              <tr>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Overall %</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{overallTotal}</td>
                <td>{overallPresent}</td>
                <td>{overallPercentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default StudentDashboard;