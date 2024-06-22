import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: ''
  });

  const { mobileNumber, password } = formData;
  const history = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ mobileNumber, password });
      history.push('/');
    } catch (err) {
      console.error(err.message);
      alert('Login Failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Mobile Number</label>
          <input type="text" name="mobileNumber" value={mobileNumber} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;