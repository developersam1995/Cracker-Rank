import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// import AccountCircle from '@material-ui/icons/AccountCircle';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {redirect:false};
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('ptok');
      localStorage.removeItem('type');
      localStorage.clear();
      this.setState({redirect:true});
    }

  }
  render() {
    if(this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div className='Menu'>
        <div>
          <span>
            <Link to="/" className="Link">CrackerRank</Link>
          </span>
          {/* <AccountCircle className='user-icon' /> */}

          {localStorage.getItem('type') == 'developer' ?
            [<span><Link to="/practice" className="Link" key='prac'>Practice</Link> </span>,
              <span><Link to="/hiring" className="Link" key='hir'>Hiring</Link> </span>] :
            <span />}

        </div>
        <div>
          <span>
            <Link to="/profile" className="Link">{localStorage.getItem('name')}</Link>
          </span>
          <span>
            {localStorage.getItem('ptok') ? 
              <button className="button-logout" onClick={this.logoutHandler}>Logout</button> : 
              <span />}
          </span>
        </div>
      </div>
    );
  }
}

export default Menu;
