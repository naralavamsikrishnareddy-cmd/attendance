import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar({ title, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-main">
      <h2 className="logo" onClick={() => navigate("/")}>
        AMS
      </h2>

      <div className="nav-links">
        <span
          className={isActive("/") ? "nav-link active" : "nav-link"}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span
          className={isActive("/about") ? "nav-link active" : "nav-link"}
          onClick={() => navigate("/about")}
        >
          About
        </span>

        <span
          className={isActive("/contact") ? "nav-link active" : "nav-link"}
          onClick={() => navigate("/contact")}
        >
          Contact
        </span>

        <span
          className={isActive("/resources") ? "nav-link active" : "nav-link"}
          onClick={() => navigate("/resources")}
        >
          Resources
        </span>

        {/* Dashboard Title */}
        {title && <span className="nav-title">{title}</span>}

        {/* Logout Button */}
        {onLogout && (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;