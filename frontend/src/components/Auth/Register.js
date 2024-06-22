import React, { useState } from 'react';
import authService from '../../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    password: ''
  });

  const { name, mobileNumber, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ name, mobileNumber, password });
      alert('Registration Successful');
    } catch (err) {
      console.error(err.message);
      alert('Registration Failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="text" name="mobileNumber" value={mobileNumber} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;