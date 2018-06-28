import React from 'react';
import Menu from '../component/Menu';
import Alert from '../component/Alert';
import './RegisterBusiness.css';
import { Link } from 'react-router-dom';
import PageTitle from '../component/PageTitle';

class RegisterBusiness extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        mobile: '',
        companyName: '',
        address: '',
        type: 'business'
      },
      alertMessage: '',
      companyRegisterd: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { company } = this.state;
    this.setState({
      company: {
        ...company,
        [name]: value
      }
    });
  };

  validateEmail(username) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(username).toLowerCase());
  }

  isValid() {
    let errorMsg = '';
    const { company } = this.state;

    if (company.username === '') {
      errorMsg += 'Please provide your email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    } else if (!this.validateEmail(company.username)) {
      errorMsg += 'Please provide your valid email\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.password === '') {
      errorMsg += 'Please provide your password\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.confirmPassword === '') {
      errorMsg += 'Please provide your confirm password\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.password !== company.confirmPassword) {
      errorMsg += 'Please enter correct password.\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.name === '') {
      errorMsg += 'Please provide your name \n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.mobile === '') {
      errorMsg += 'Please provide your mobile\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    } else if (!Number.isInteger(company.mobile) && company.mobile.length != 10) {
      errorMsg += 'Please provide 10 digit valid mobile number\n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.companyName === '') {
      errorMsg += 'Please provide the company name \n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (company.address === '') {
      errorMsg += 'Please provide the company address \n';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    return true;

  }

  handleSubmit(event) {
    if (this.isValid()) {
      fetch('http://localhost:4001/api/v1/register', {
        method: 'POST',
        body: JSON.stringify(this.state.company),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {

        const statusCode = response.status;

        response.json().then((parsedJSON => {
          console.log(statusCode);
          console.log(parsedJSON);
          if (statusCode === 200) {
            this.setState({
              userRegisterd: false,
              alertMessage: parsedJSON.msg
            });
          }

          if (statusCode === 201) {
            this.setState({
              company: {
                username: '',
                password: '',
                confirmPassword: '',
                name: '',
                mobile: '',
                companyName: '',
                address: ''
              },
              companyRegisterd: true,
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
    const registrationForm =
      <React.Fragment>
        <input
          className="Form-Input"
          type="text"
          name="username"
          placeholder="Email"
          value={this.state.company.username}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.company.password}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.company.confirmPassword}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={this.state.company.name}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={this.state.company.mobile}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={this.state.company.companyName}
          onChange={(event) => this.handleChange(event)} />

        <input
          className="Form-Input"
          type="text"
          name="address"
          placeholder="Address"
          value={this.state.company.address}
          onChange={(event) => this.handleChange(event)} />

        <button
          className="Form-Submit"
          onClick={this.handleSubmit}>Submit</button>
        <div>
          <p>OR</p>
          Already have an account <Link to="/">Login</Link>
        </div>
      </React.Fragment>;

    let alertSuccess = null;
    if (this.state.alertMessage) {
      alertSuccess = <Alert message={this.state.alertMessage} />;
    }

    return (
      <React.Fragment>
        <Menu />
        <PageTitle title="Business Registration" />
        {alertSuccess}
        <div className="RegisterBusiness">
          {registrationForm}
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterBusiness;