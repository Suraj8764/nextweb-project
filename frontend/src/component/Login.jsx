import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [credentials, setCredentials] = useState({ Email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!credentials.Email) errors.mobile = 'Email is required';
    if (!credentials.password) errors.password = 'Password is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Proceed with login logic
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="mobile">Email:</label>
        <input type="text" id="Email" name="Email" value={credentials.Email} onChange={handleChange} />
        {errors.Email && <p className="error-message">{errors.Email}</p>}

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button style={{margin:"4rem",borderRadius:"34rem"}} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
