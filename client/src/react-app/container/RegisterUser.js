import React from 'react';
import Menu from '../component/Menu';
import './RegisterUser.css';
import PageTitle from '../component/PageTitle';
import Alert from '../component/Alert';
import { Link } from 'react-router-dom';

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        type: 'developer'
      },

      alertMessage: '',
      userRegisterd: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleChange(event) {

    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValid() {
    let errorMsg = '';
    const { user } = this.state;

    if (user.name === '') {
      errorMsg += 'Please provide your name \n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (user.email === '') {
      errorMsg += 'Please provide your email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    } else if (!this.validateEmail(user.email)) {
      errorMsg += 'Please provide your valid email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (user.mobile === '') {
      errorMsg += 'Please provide your mobile\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    } else if (!Number.isInteger(user.mobile) && user.mobile.length != 10) {
      errorMsg += 'Please provide 10 digit valie mobile number\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (user.password === '') {
      errorMsg += 'Please provide your password\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (user.confirmPassword === '') {
      errorMsg += 'Please provide your confirm password\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (user.password !== user.confirmPassword) {
      errorMsg += 'Please enter correct password.\n';
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

  handleSubmit(event) {
    if (this.isValid()) {
      const user = this.state.user;
      delete user.confirmPassword;
      fetch('http://localhost:4001/api/v1/users/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {

        const statusCode = response.status;

        response.json().then((parsedJSON => {
          console.log(statusCode);
          console.log(parsedJSON);
          if (statusCode === 403) {
            this.setState({
              user: {
                name: '',
                email: '',
                mobile: '',
                password: '',
                confirmPassword: ''
              },
              userRegisterd: false,
              alertMessage: parsedJSON.error
            });
          }

          if (statusCode === 201) {
            this.setState({
              user: {
                name: '',
                email: '',
                mobile: '',
                password: '',
                confirmPassword: ''
              },
              userRegisterd: true,
              alertMessage: 'Successfully Registered'
            });
          }
        }));
      }).catch(error => {
        console.log('error ', error);
        this.setState({
          alertMessage: error
        });
      });
    }
  }

  render() {
    const registrationForm = <React.Fragment>
      <input
        className="Form-Input"
        type="text"
        name="name"
        placeholder="Name"
        value={this.state.user.name}
        onChange={(event) => this.handleChange(event)} />

      <input
        className="Form-Input"
        type="text"
        name="email"
        placeholder="Email"
        value={this.state.user.email}
        onChange={(event) => this.handleChange(event)} />

      <input
        className="Form-Input"
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={this.state.user.mobile}
        onChange={(event) => this.handleChange(event)} />

      <input
        className="Form-Input"
        type="password"
        name="password"
        placeholder="Password"
        value={this.state.user.password}
        onChange={(event) => this.handleChange(event)} />

      <input
        className="Form-Input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={this.state.user.confirmPassword}
        onChange={(event) => this.handleChange(event)} />

      <button
        onClick={this.handleSubmit}>Submit</button>
      <div>
        <p>OR</p>
        Already have an account <Link to="/login">Login</Link>
      </div>
    </React.Fragment>;

    let alertSuccess = null;
    if (this.state.alertMessage) {
      alertSuccess = <Alert message={this.state.alertMessage} />;
    }

    return (
      <div>
        <Menu />
        <PageTitle title="Registration" />
        {alertSuccess}
        <div className="RegisterUser">
          {registrationForm}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     // onIncrementCounter: () => dispatch({type: 'INCREMENT'})
//     // onStore: () => dispatch({type: actionTypes.REGISTER}),
//     change: (e) => dispatch({type: actionTypes.UPDATE, target:e})
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterUser;