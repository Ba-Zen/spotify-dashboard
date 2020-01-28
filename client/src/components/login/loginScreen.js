import React from 'react';
import './loginScreen.styles.scss';

const LoginScreen = () => {
  return (
    <div className='login-wrapper'>
      <a
        className='login-button'
        href='https://myspotify-backend.herokuapp.com/login'
      >
        {' '}
        Login to Spotify{' '}
      </a>
      {/* <a className='login-button' href='http://localhost:8888/login'>
        {' '}
        Login to Spotify{' '}
      </a> */}
      <div className='demo-login'>
        <p>
          If you don't have your own Spotify account feel free to sign in with
          the details below!
        </p>
        <h2>Email: myspotifydemo@gmail.com</h2>
        <h2>Password: demo1234</h2>
      </div>
    </div>
  );
};

export default LoginScreen;
