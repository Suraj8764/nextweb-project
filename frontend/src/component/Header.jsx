import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for styling

const Header = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
    <header className="header">
<Link to={"/"} style={{ textDecoration: "none",fontStyle:"oblique" }}> 
        <h1><span style={{fontSize:"3rem",color:"black"}}>R</span><span style={{color:"blue"}}>esource</span> <span style={{fontSize:"3rem",color:"black"}}>M</span>anagement <span style={{fontSize:"3rem",color:"black"}}>P</span>ortal</h1>
      </Link>      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
        {profilePicture ? (
          <div className="profile-wrapper">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
            <input
                type="file"
                onChange={handleProfilePictureChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              
            <label className="icon-button">
              <button style={{position:"relative",top:"9px",borderRadius:"12px"}} onClick={handleAddButtonClick}>ADD+</button>
             
            </label>
          </div>
        ) : (
          <label className="icon-button">
            <button  style={{position:"relative",top:"9px",borderRadius:"12px"}} onClick={handleAddButtonClick}>ADD+</button>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </label>
        )}
        <Link to="/add">
          <button style={{borderRadius:"12px"}}>Add Item</button>
        </Link>
        <Link to="/login">
          <button style={{borderRadius:"12px"}} >Login</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
