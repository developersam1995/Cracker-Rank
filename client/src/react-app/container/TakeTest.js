import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import Menu from '../component/Menu';
import Question from '../component/Question';
import QuestionList from '../component/QuestionList';
import './Editor.css';
import './TakeTest.css';
import Editor from './Editor';

class TakeTest extends React.Component{

  constructor(){
    super();
    this.state={
      questionIds:[]
    };
  }

  componentDidMount(){
    //let TakeTestId=this.props.test
    fetch('http://localhost:4001/api/v1/test?id='+this.props.testId,{
      headers:{
        Authorization:this.props.token
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({questionIds:data[0].questionID});
        this.props.linkWithEditor(data[0].questionID[0]);
      });
  }

  render(){
    return(
      <Fragment>
        <Menu timer='00:20:00'/>
        <div className='Business-Test'>
          <QuestionList questionIds={this.state.questionIds}/>
          <div>
            <Editor/>
          </div>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps=(state)=>{
  return{
    testId:state.getTest.testId,
    //questionId:state.linkEditer.questionId,
    token:state.getToken.token
  };
};

const mapStateToDispatch=(dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(TakeTest);