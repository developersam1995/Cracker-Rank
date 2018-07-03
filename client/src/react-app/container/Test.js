import React, { Fragment } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import Menu from '../component/Menu';
import './Test.css';

class Test extends React.Component{
  constructor(props){
    super(props);

    this.state={
      testDet:{},
      questions:[],
      candidates:[]
    };
  }

  componentDidMount(){
    fetch('http://localhost:4001/api/v1/test/profile?id='+this.props.testId,{
      headers:{
        Authorization:this.props.token
      }
    })
      .then((res)=>res.json())
      .then((testDetails)=>{
        console.log(testDetails);
        this.setState({
          testDet:testDetails.test_Detail[0],
          questions:testDetails.questions,
          candidates:testDetails.candidates
        });

        console.log('state',this.state);
      });
  }

  render(){
    return(
      <Fragment>
        <Menu/>
        <div className='Test'>

        
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state){
  return{
    testId:state.getTest.testId,
    token:state.getToken.token
  };
};

function mapStateToDispatch(dispatch){
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(Test);
