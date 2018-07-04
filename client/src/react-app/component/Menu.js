import React from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
// import AccountCircle from '@material-ui/icons/AccountCircle';

class Menu extends React.Component {
  render() {
    return (
      <div className='Menu'>
        <div>
          <span>
          <Link to="/" className="Link">CrackerRank</Link>
          </span>
          {/* <AccountCircle className='user-icon' /> */}
          <span>
          <Link to="/practice" className="Link">Practice</Link>
          </span>
          <span>
          <Link to="/hiring" className="Link">Hiring</Link>
          </span>
        </div>
        <div>
          <span>
          <Link to="/profile" className="Link">{localStorage.getItem('name')}</Link>
          </span>
          <span>
          <button className="button-logout">Logout</button>
          </span>
        </div>
      </div>
    );
  }
}

export default Menu;