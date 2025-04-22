import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:4003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    
    if (res.ok) {
      navigate('/register');
    } else {
      alert(data.msg);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div className='login' style={{marginBottom:"105px"}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Enter Username</label>
            <input type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" placeholder="Enter Username" required onChange={handleInput}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" required onChange={handleInput} name='password'/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
