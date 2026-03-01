import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
 // make sure CSS is imported

function StudentDashboard() {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "student") {
      navigate("/student/login");
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!currentStudent) return <p>Loading...</p>;

  const attendance = currentStudent.attendance || {};

  let overallTotal = 0;
  let overallPresent = 0;

  const courseRows = currentStudent.courses?.map((course) => {
    const data = attendance[course] || { total: 0, present: 0 };

    const total = data.total;
    const present = data.present;
    const percentage =
      total === 0 ? 0 : ((present / total) * 100).toFixed(2);

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
      <Navbar title="Student Dashboard" onLogout={handleLogout} />

      <div className="dashboard">

        {/* STUDENT INFO */}
        <div className="card">
          <h3>Student Info</h3>
          <p><strong>Roll:</strong> {currentStudent.roll}</p>
          <p><strong>Name:</strong> {currentStudent.name}</p>
          <p><strong>Courses:</strong> {currentStudent.courses?.join(", ")}</p>
        </div>

        {/* COURSE ATTENDANCE TABLE */}
        <div className="card">
          <h3>Course-wise Attendance</h3>

          {/* ✅ Only one correct table */}
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Total</th>
                <th>Present</th>
                <th>%</th>
              </tr>
            </thead>

            <tbody>
              {courseRows && courseRows.length > 0 ? (
                courseRows
              ) : (
                <tr>
                  <td colSpan="4">No Attendance Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* OVERALL */}
        <div className="card">
          <h3>Overall Attendance</h3>
          <p>Total Classes: {overallTotal}</p>
          <p>Present: {overallPresent}</p>
          <p>Overall Percentage: {overallPercentage}%</p>
        </div>

      </div>
    </>
  );
}

export default StudentDashboard;