import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    localStorage.removeItem('user');
    localStorage.removeItem('resources');

   
    toast('You have been logged out successfully.');

  
    navigate('/');
  }, [navigate]);

  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
