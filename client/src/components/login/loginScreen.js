import React from 'react';

let login =
  process.env.NODE_ENV === 'production'
    ? 'https://myspotify-backend.herokuapp.com/login'
    : 'http://localhost:8888/login';
const LoginScreen = () => (
  <div>
    <a href={login}> Login to Spotify.... </a>
  </div>
);

export default LoginScreen;
