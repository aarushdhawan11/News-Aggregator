

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [serverErrors, setServerErrors] = useState([]); 
  const navigate = useNavigate();

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setServerErrors([]); 

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        if (data.msg === 'User created') {
          navigate('/login');
        } else {
          setError(data.msg || 'An error occurred');
        }
      } else {
        
        if (data.errors) {
          setServerErrors(data.errors);
        } else {
          setError(data.msg || 'An error occurred');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Failed to sign up. Please try again later.');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div className='login'>
        {}
        {error && <div className="error-message">{error}</div>}

        {}
        {serverErrors.length > 0 && (
          <ul className="error-list">
            {serverErrors.map((err, index) => (
              <li key={index} className="error-item">{err.msg}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-username">Username</label>
            <input
              type="text"
              className="form-control"
              id="new-username"
              name="username"
              placeholder="Enter Username"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-email">Email</label>
            <input
              type="email"
              className="form-control"
              id="new-email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Password</label>
            <input
              type="password"
              className="form-control"
              id="new-password"
              name="password"
              required
              onChange={handleInput}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}