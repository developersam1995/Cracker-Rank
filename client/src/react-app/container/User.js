import React, { Fragment } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators'; 

import './User.css';
import Menu from '../component/Menu';
import UserDet from '../component/UserDet';
import UserPracticeList from '../component/UserPracticeList';
import UserTestList from '../component/UserTestList';

class User extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userDetails:{},
      practiceQuestionList:{},
      allTestList:{} //with Developer User test took data appended 
    };
  }

  componentDidMount(){
    fetch('http://localhost:4001/api/v1/users',{
      method:'GET',
      headers:{
        Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjcmFja2VycmFuayIsInN1YiI6IjViM2EwY2NjMzZkZDA3MmI5OGQyNjE4NyIsImlhdCI6MTUzMDUzMzgyOTYxOSwiZXhwIjoxNTMwNjIwMjI5NjE5fQ.XqKXE9BlT8grkME17wmnxt0YXXvy2aaUtGr8cmGPXqY'//this.props.token
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({
          userDetails:data.userDetails[0],
          practiceQuestionList:data.PracticeQuestionList,
          allTestList:data.allTestList
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  render(){
    return(
      <Fragment>
        <Menu/>
        <div className='User'>
          <UserDet details={this.state.userDetails}/>
          <UserPracticeList practicedDet={this.state.practiceQuestionList}/>
          <UserTestList testDet={this.state.allTestList}/>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    // token:state.storeToken.token,
    // userId:state.user.userId
  };
};

const mapStateToDispatch = (dispatch) =>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(User);