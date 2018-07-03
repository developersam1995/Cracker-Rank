import React from 'react';
import './Menu.css';
import { Link, Redirect } from 'react-router-dom';
import Home from '../container/Home';
// import AccountCircle from '@material-ui/icons/AccountCircle';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isLogin: false
    };
  }

  logOut() {
    this.setState({isLogin: false});
    console.log('called');
    localStorage.clear();
  }

  render() {
    let logOutButton = null;
    if (localStorage.getItem('ptok')) {
      logOutButton = <button onClick={() => this.logOut()}>Logout</button>;
    }

    if(this.state.isLogin) {
      console.log('from islogin');
      <Home />;
    }

    return (
      <div className='Menu'>
        <span>
          <Link to="/" className="Link">CrackerRank</Link>
        </span>
        {/* <AccountCircle className='user-icon' /> */}
        <span>
          <Link to="/practice" className="Link">Practice</Link>
        </span>
        <span>
          <Link to="/profile" className="Link">{localStorage.getItem('name')}</Link>
        </span>
        <span>
          {logOutButton}
        </span>
      </div>
    );
  }
}

export default Menu;