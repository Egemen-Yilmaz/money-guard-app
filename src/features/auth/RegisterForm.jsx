import React from 'react';

const RegisterForm = () => (
  <form>
    <h2>Register</h2>
    <input name="name" placeholder="Name" />
    <input name="email" placeholder="Email" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
);

export default RegisterForm;
