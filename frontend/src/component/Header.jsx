import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user,"user");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setIsAuthenticated(!!userData);
  }, []);

// // In another file
// // Retrieve the stringified data from localStorage
// const dataString = localStorage.getItem("userr");

// // Parse the stringified data back into its original form
// const data = JSON.parse(dataString);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("resources");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>
        <span style={{ fontSize: "3rem", color: "black" }}>R</span>
        <span style={{ color: "blue" }}>esource</span>
        <span style={{ fontSize: "3rem", color: "black" }}>M</span>
        anagement
        <span style={{ fontSize: "3rem", color: "black" }}>P</span>ortal
      </h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        {profilePicture ? (
          <div className="profile-wrapper">
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <input
              type="file"
              onChange={handleProfilePictureChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            {isAuthenticated && (
              <label className="icon-button">
                <button
                  style={{
                    position: "relative",
                    top: "9px",
                    borderRadius: "12px",
                  }}
                  onClick={handleAddButtonClick}
                >
                  ADD+
                </button>
              </label>
            )}
          </div>
        ) : (
          isAuthenticated && (
            <label className="icon-button">
              <button
                style={{ position: "relative", top: "9px", borderRadius: "12px" }}
                onClick={handleAddButtonClick}
              >
                ADD+
              </button>
              <input
                type="file"
                onChange={handleProfilePictureChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </label>
          )
        )}

        {isAuthenticated && (
          <Link to="/add">
            <button style={{ borderRadius: "12px" }}>Add Item</button>
          </Link>
        )}

        

        {isAuthenticated && (
          <Link to="/">
            <button style={{ borderRadius: "12px" }} onClick={handleLogout}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
