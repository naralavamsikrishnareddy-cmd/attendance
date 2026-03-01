import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  // ================= PROTECT DASHBOARD =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // ================= STATE =================
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [courseName, setCourseName] = useState("");

  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [facultyName, setFacultyName] = useState("");
  const [facultyCourse, setFacultyCourse] = useState("");
  const [facultyEditId, setFacultyEditId] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setFaculties(JSON.parse(localStorage.getItem("faculties")) || []);
  }, []);

  const saveCourses = (data) =>
    localStorage.setItem("courses", JSON.stringify(data));

  const saveStudents = (data) =>
    localStorage.setItem("students", JSON.stringify(data));

  const saveFaculties = (data) =>
    localStorage.setItem("faculties", JSON.stringify(data));

  // ================= COURSE =================
  const addCourse = () => {
    if (!courseName) return;

    const updated = [...courses, courseName];
    setCourses(updated);
    saveCourses(updated);
    setCourseName("");
  };

  const deleteCourse = (course) => {
    const updated = courses.filter((c) => c !== course);
    setCourses(updated);
    saveCourses(updated);
  };

  // ================= STUDENT =================
  const addOrUpdateStudent = () => {
    if (!roll || !name || selectedCourses.length === 0) return;

    const username = roll;
    const password = roll + "@123";

    if (editId) {
      const updated = students.map((s) =>
        s.id === editId
          ? { ...s, roll, name, courses: selectedCourses }
          : s
      );

      setStudents(updated);
      saveStudents(updated);
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        roll,
        name,
        courses: selectedCourses,
        username,
        password,
        attendance: {},
      };

      const updated = [...students, newStudent];
      setStudents(updated);
      saveStudents(updated);

      alert(
        `Student Created!\nUsername: ${username}\nPassword: ${password}`
      );
    }

    setRoll("");
    setName("");
    setSelectedCourses([]);
  };

  const editStudent = (student) => {
    setRoll(student.roll);
    setName(student.name);
    setSelectedCourses(student.courses || []);
    setEditId(student.id);
  };

  const deleteStudent = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveStudents(updated);
  };

  // ================= FACULTY =================
  const addOrUpdateFaculty = () => {
    if (!facultyName || !facultyCourse) return;

    if (facultyEditId) {
      const updated = faculties.map((f) =>
        f.id === facultyEditId
          ? { ...f, name: facultyName, course: facultyCourse }
          : f
      );

      setFaculties(updated);
      saveFaculties(updated);
      setFacultyEditId(null);
    } else {
      const newFaculty = {
        id: Date.now(),
        name: facultyName,
        course: facultyCourse,
      };

      const updated = [...faculties, newFaculty];
      setFaculties(updated);
      saveFaculties(updated);
    }

    setFacultyName("");
    setFacultyCourse("");
  };

  const deleteFaculty = (id) => {
    const updated = faculties.filter((f) => f.id !== id);
    setFaculties(updated);
    saveFaculties(updated);
  };

  return (
    <>
      <Navbar title="Admin Dashboard" onLogout={handleLogout} />

      <div className="dashboard-container">

        <div className="admin-tabs">
          <button onClick={() => setActiveTab("courses")}>Courses</button>
          <button onClick={() => setActiveTab("students")}>Students</button>
          <button onClick={() => setActiveTab("faculty")}>Faculty</button>
        </div>

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div className="card">
            <h3>{editId ? "Update Student" : "Add Student"}</h3>

            <input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Roll No" />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />

            <select
              multiple
              value={selectedCourses}
              onChange={(e) =>
                setSelectedCourses(
                  Array.from(e.target.selectedOptions, option => option.value)
                )
              }
            >
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>

            <button onClick={addOrUpdateStudent}>
              {editId ? "Update" : "Add"}
            </button>

            <table>
              <thead>
                <tr>
                  <th>Roll</th>
                  <th>Name</th>
                  <th>Courses</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.roll}</td>
                    <td>{s.name}</td>
                    <td>{s.courses?.join(", ")}</td>
                    <td>
                      <button onClick={() => editStudent(s)}>Edit</button>
                      <button onClick={() => deleteStudent(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
}

export default AdminDashboard;