import React from 'react';

let login =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://myspotbackend.herokuapp.com/login';
const LoginScreen = () => (
  <div>
    <a href={login}> Login to Spotify.... </a>
  </div>
);

export default LoginScreen;
