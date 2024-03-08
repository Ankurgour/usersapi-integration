import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://usersapi-integration.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Welcome, ${data.user.username}! You are now logged in.`);
      } else {
        const errorData = await response.json();
        setMessage(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ width: '300px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <label style={{ marginBottom: '10px' }}>
          Username:
          <input type="text" name="username" required placeholder='Enter your username' value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Password:
          <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Enter your password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </label>
        <button type="submit" style={{ backgroundColor: "#4caf50", color: "#fff", padding: "10px", borderRadius: "4px", cursor: "pointer", position:"relative", left:"100px", marginTop:"10px" }}>Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      <p style={{ marginTop: '20px' }}>
        <Link to="/forgot-password" style={{ color: '#3498db', textDecoration: 'none' }}>Forgot Password?</Link>
      </p>
      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

