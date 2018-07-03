import React, { Fragment } from 'react';
import {Redirect} from 'react-router-dom';

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
        Authorization:this.props.token //value from redux
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
    if(this.props.token=='unauthorized'){
      return <Redirect to='/'/>
    }
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
    token:state.getToken.token
  };
};

const mapStateToDispatch = (dispatch) =>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(User);