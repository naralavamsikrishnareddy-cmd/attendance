// pages/admin/AdminDashboard.js
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
  const [selectedCourse, setSelectedCourse] = useState("");
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
    if (!roll || !name || !selectedCourse) return;

    const username = roll;
    const password = roll + "@123";

    if (editId) {
      const updated = students.map((s) =>
        s.id === editId
          ? { ...s, roll, name, course: selectedCourse }
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
        course: selectedCourse,
        username,
        password,
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
    setSelectedCourse("");
  };

  const editStudent = (student) => {
    setRoll(student.roll);
    setName(student.name);
    setSelectedCourse(student.course);
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

  const editFaculty = (faculty) => {
    setFacultyName(faculty.name);
    setFacultyCourse(faculty.course);
    setFacultyEditId(faculty.id);
  };

  const deleteFaculty = (id) => {
    const updated = faculties.filter((f) => f.id !== id);
    setFaculties(updated);
    saveFaculties(updated);
  };

  // ================= UI =================
  return (
    <>
      <Navbar title="Admin Dashboard" onLogout={handleLogout} />

      <div className="dashboard-container">

        <div className="admin-tabs">
          <button onClick={() => setActiveTab("courses")} className={activeTab === "courses" ? "active" : ""}>Courses</button>
          <button onClick={() => setActiveTab("students")} className={activeTab === "students" ? "active" : ""}>Students</button>
          <button onClick={() => setActiveTab("faculty")} className={activeTab === "faculty" ? "active" : ""}>Faculty</button>
        </div>

        {/* COURSES */}
        {activeTab === "courses" && (
          <div className="card">
            <h3>Add Course</h3>
            <input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name" />
            <button onClick={addCourse}>Add</button>

            <table>
              <thead>
                <tr><th>Course Name</th><th>Action</th></tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course}</td>
                    <td><button onClick={() => deleteCourse(course)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div className="card">
            <h3>{editId ? "Update Student" : "Add Student"}</h3>
            <input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Roll No" />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
            <button onClick={addOrUpdateStudent}>{editId ? "Update" : "Add"}</button>

            <table>
              <thead>
                <tr><th>Roll</th><th>Name</th><th>Course</th><th>Action</th></tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.roll}</td>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
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

        {/* FACULTY */}
        {activeTab === "faculty" && (
          <div className="card">
            <h3>{facultyEditId ? "Update Faculty" : "Add Faculty"}</h3>
            <input value={facultyName} onChange={(e) => setFacultyName(e.target.value)} placeholder="Faculty Name" />
            <select value={facultyCourse} onChange={(e) => setFacultyCourse(e.target.value)}>
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
            <button onClick={addOrUpdateFaculty}>{facultyEditId ? "Update" : "Add"}</button>

            <table>
              <thead>
                <tr><th>Name</th><th>Course</th><th>Action</th></tr>
              </thead>
              <tbody>
                {faculties.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{f.course}</td>
                    <td>
                      <button onClick={() => editFaculty(f)}>Edit</button>
                      <button onClick={() => deleteFaculty(f.id)}>Delete</button>
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