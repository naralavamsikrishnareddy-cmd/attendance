import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>About AMS</li>
            <li>Attendance Reports</li>
            <li>Student Login</li>
            <li>Faculty Login</li>
            <li>Admin Dashboard</li>
            <li>Attendance Policies</li>
            <li>Help & Support</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h3>Attendance Modules</h3>
          <ul>
            <li>Student Attendance Tracking</li>
            <li>Faculty Attendance Entry</li>
            <li>Admin Monitoring</li>
            <li>Monthly Reports</li>
            <li>Attendance Analytics</li>
            <li>Defaulter List</li>
            <li>Leave Management</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Policies & Information</h3>
          <ul>
            <li>Attendance Rules</li>
            <li>Minimum 75% Requirement</li>
            <li>Leave Guidelines</li>
            <li>Anti-Ragging Policy</li>
            <li>Student Grievances</li>
            <li>Data Privacy Policy</li>
            <li>Institutional Disclosure</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Attendance Monitoring System | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;