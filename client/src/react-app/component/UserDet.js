import React from 'react';

import './UserDet.css';

class UserDet extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userDet:{},
      noOfTestsTaken:null
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({userDet:nextProps.details,
      noOfTestsTaken:nextProps.details.userProfileDev.tests.length});
  }

  render(){
    return(
      <div className='User-Det'>
        <img src='https://image.ibb.co/g41N4o/prof_pic2.png' className='User-Det-Prof'/>
        <br/>
        <span className='User-Type'>{this.state.userDet.type} Account</span>
        <p><span className='User-Det-Title'>name:</span><span>{this.state.userDet.name}</span></p>
        <p><span className='User-Det-Title'>mail:</span><span>{}</span></p> {/*localStorage.getItem('mail') */}
        <p><span className='User-Det-Title'>mobile:</span><span>{this.state.userDet.mobile}</span></p>
        <br/>
        <p><span className='User-Det-Title'>Number of test Taken:</span><span>{this.state.noOfTestsTaken}</span></p>

      </div>
    );
  }
}

export default UserDet;