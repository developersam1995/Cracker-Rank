import React from 'react';
import './Login.css';
import Menu from '../component/Menu';


class Login extends React.Component {
  render() {
    return (
      <div className="Landing">
        <Menu />
        <div className="container">
          <div className="banner">
            Pratice Coding, Participate Events, Find Jobs
          </div>
          <div className="form-container">
            <form>
              <input type="text" name="username" placeholder="Username or email" />
              <input type="password" name="password" placeholder="Password" />
              <a href="/">Forget Password?</a>
              <input type="submit" name="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;