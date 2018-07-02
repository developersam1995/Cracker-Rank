import React, { Fragment } from 'react';

import './UserPracticeList.css';

class UserPracticeList extends React.Component{
  constructor(props){
    super(props);

    this.state={
      practicedList:[]
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({practicedList:nextProps.practicedDet});
  }

  componentDidMount(){

  }

  render(){
    return(
      <div className = 'User-Practice-List'>
        <div className='User-Practice-List-Header'>
          <span>All Questions List</span>
        </div>
        <br/>
        <div className='User-Practice-List-divmain'>
          {
            this.state.practicedList.map((val,index)=>{
              if(val.Practiced===true){
                return (
                  <div key={index} className='User-Practice-List-div done'>{val.title}</div>
                );
              }else{
                return (
                  <div key={index} className='User-Practice-List-div'>{val.title}</div>
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}

export default UserPracticeList;