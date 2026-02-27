import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar"; // ✅ FIXED PATH
import Footer from "../../components/layout/Footer";                     
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Attendance Monitoring System</h1>
          <p className="home-subtitle">
            A smart digital solution to manage attendance efficiently, securely,
            and intelligently for modern institutions.
          </p>

          <button
            className="home-btn"
            onClick={() => navigate("/role-select")}
          >
            Login
          </button>
        </div>
      </div>
       {/* ✅ Footer Added */}
  <Footer />
    </>
  );
}

export default Home;