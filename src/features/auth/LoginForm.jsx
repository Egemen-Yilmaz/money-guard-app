import React from 'react';

const LoginForm = () => (
  <form>
    <h2>Login</h2>
    <input name="email" placeholder="Email" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;
