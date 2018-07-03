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
          <span>Questions Practiced</span>
        </div>
        <br/>
        <div className='User-Practice-List-divmain'>
          {
            this.state.practicedList.map((val,index)=>{
              if(val.practiced===true){
                return (
                  <div key={index} className='User-Practice-List-div done'>{val.title}</div>
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
