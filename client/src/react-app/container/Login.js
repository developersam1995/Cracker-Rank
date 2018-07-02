import React from 'react';
import './Login.css';
import Menu from '../component/Menu';
import Home from '../container/Home';
import Business from '../container/BusinessHome';
import PageTitle from '../component/PageTitle';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import Alert from '../component/Alert';
import BusinessHome from '../container/BusinessHome';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: '',
        password: ''
      },
      alertMessage: '',
      userType: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { login } = this.state;

    this.setState({
      login: {
        ...login,
        [name]: value
      }
    });
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValid() {
    let errorMsg = '';
    const { login } = this.state;

    if (login.email === '') {
      errorMsg = 'Please provide your email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    } else if (!this.validateEmail(login.email)) {
      errorMsg = 'Please provide your valid email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (login.password === '') {
      errorMsg = 'Please provide your password\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    this.setState({
      alertMessage: errorMsg
    });
    return true;
  }

  handleSubmit() {
    let statusCode;
    if (this.isValid()) {
      fetch('http://localhost:4001/api/v1/users/signin', {
        method: 'POST',
        body: JSON.stringify(this.state.login),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        statusCode = response.status;
        if (statusCode == 401) {
          return this.setState({ alertMessage: 'Invalid email or password' });
        }
        return response.json();
      }).then(parsedJSON => {
        if (statusCode === 200) {
          localStorage.setItem('ptok',parsedJSON.token);
          localStorage.setItem('type',parsedJSON.user.type);
          this.setState({ userType: parsedJSON.user.type });
        }
      });
    }
  }

  render() {

    const loginForm = <React.Fragment>
      <input
        className='Form-Input'
        type='text'
        name='email'
        placeholder='Email'
        value={this.state.login.email}
        onChange={(event) => this.handleChange(event)} />

      <input
        className='Form-Input'
        type='password'
        name='password'
        placeholder='Password'
        value={this.state.login.password}
        onChange={(event) => this.handleChange(event)} />

      <button
        className='Form-Submit'
        onClick={this.handleSubmit}>Submit</button>

      <div>
        <BrowserRouter >
          <Link to="/auth/login">
            <button
              className='btn-google ripple'>
              <SocialIcon network="google" color='#fff' style={{ height: 30, width: 30 }} className='social-icon' />
              &nbsp;Continue with Google</button>
          </Link>
        </BrowserRouter>
        <button
          className='btn-facebook ripple'>
          <SocialIcon network="facebook" color="#fff" style={{ height: 30, width: 30 }} />
          &nbsp;Continue with Facebook</button>

      </div>
      <div>
        <p>OR</p>
        <Link to='/signup/user'>New Acoount(Developer)?</Link>
        <Link to='/signup/business'>New Account(Recruiter)?</Link>
      </div>

    </React.Fragment>;

    let alertSuccess = null;
    if (this.state.alertMessage) {
      alertSuccess = <Alert message={this.state.alertMessage} />;
    }

    if (this.state.userType === 'developer') {
      return <Home />;
    }

    if (this.state.userType === 'business') {
      return <BusinessHome />;
    }

    return (
      <React.Fragment>
        <Menu />
        <PageTitle title='Login' />
        {alertSuccess}
        <div className='LoginForm'>
          {loginForm}
        </div>
      </React.Fragment>
    );
  }
}

export default Login;