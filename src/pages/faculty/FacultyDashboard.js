import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./faculty.css"; // make sure CSS is imported

function FacultyDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [facultyCourse, setFacultyCourse] = useState("");

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "faculty") {
      navigate("/faculty/login");
      return;
    }

    setFacultyCourse(user.course);

    const storedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(storedStudents);
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // ================= MARK ATTENDANCE =================
  const markAttendance = (id, status) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        const courseAttendance =
          student.attendance?.[facultyCourse] || {
            total: 0,
            present: 0,
          };

        const newTotal = courseAttendance.total + 1;
        const newPresent =
          status === "Present"
            ? courseAttendance.present + 1
            : courseAttendance.present;

        return {
          ...student,
          attendance: {
            ...student.attendance,
            [facultyCourse]: {
              total: newTotal,
              present: newPresent,
            },
          },
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };

  return (
    <>
      <Navbar
        title="Faculty Dashboard"
        onLogout={handleLogout}
      />

      <div className="dashboard">

        <div className="card">
          <h3>Assigned Course</h3>
          <p><strong>{facultyCourse}</strong></p>
        </div>

        <div className="card">
          <h3>Mark Attendance</h3>

          {/* ✅ ONLY ONE TABLE */}
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter(
                  (student) =>
                    student.courses?.includes(facultyCourse)
                )
                .map((student) => {

                  const courseData =
                    student.attendance?.[facultyCourse];

                  return (
                    <tr key={student.id}>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>
                        <button
                          onClick={() =>
                            markAttendance(student.id, "Present")
                          }
                        >
                          Present
                        </button>

                        <button
                          onClick={() =>
                            markAttendance(student.id, "Absent")
                          }
                        >
                          Absent
                        </button>
                      </td>

                      <td>
                        {courseData
                          ? `Total: ${courseData.total}, Present: ${courseData.present}`
                          : "Not Marked"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

export default FacultyDashboard;