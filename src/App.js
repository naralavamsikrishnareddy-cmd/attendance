import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import "./styles/App.css";
import "./styles/Auth.css";

// Pages
import Home from "./pages/home/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import Resources from "./pages/common/Resources";

// Role Selection
import RoleSelect from "./components/RoleSelect";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Faculty
import FacultyRegister from "./pages/faculty/FacultyRegister";
import FacultyLogin from "./pages/faculty/FacultyLogin";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

// Student
import StudentLogin from "./pages/student/StudentLogin";
import ChangePassword from "./pages/student/ChangePassword";
import StudentDashboard from "./pages/student/StudentDashboard";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= FACULTY ================= */}
        <Route path="/faculty/register" element={<FacultyRegister />} />
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ================= */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/change-password"
          element={
            <ProtectedRoute role="student">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;