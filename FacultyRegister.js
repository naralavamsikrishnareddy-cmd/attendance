import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

function FacultyRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    course: "",
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    const username = formData.username.trim();
    const password = formData.password.trim();
    const course = formData.course;

    if (!username || !password || !course) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password.length < 4) {
      setMessage("Password must be at least 4 characters.");
      return;
    }

    const facultyList =
      JSON.parse(localStorage.getItem("faculties")) || [];

    const userExists = facultyList.find(
      (f) => f.username === username
    );

    if (userExists) {
      setMessage("Faculty already exists!");
      return;
    }

    const newFaculty = {
      id: Date.now(),
      username,
      password,
      course,
      role: "faculty",
    };

    const updatedList = [...facultyList, newFaculty];

    localStorage.setItem(
      "faculties",
      JSON.stringify(updatedList)
    );

    setMessage("Registration Successful! Redirecting...");

    setTimeout(() => {
      navigate("/faculty/login");
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Faculty Registration</h2>

        {message && <p className="form-message">{message}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          {courses.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button onClick={handleRegister}>
          Register
        </button>

        <button onClick={() => navigate("/faculty/login")}>
          Already Registered? Login
        </button>
      </div>
    </div>
  );
}

export default FacultyRegister;