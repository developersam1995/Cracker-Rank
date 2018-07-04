import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import Menu from '../component/Menu';
import Question from '../component/Question';
import QuestionList from '../component/QuestionList';
import './Editor.css';
import './TakeTest.css';
import EditorTest from './EditorTest';
import PageTitle from '../component/PageTitle';

class TakeTest extends React.Component{

  constructor(){
    super();
    this.state={
      questionIds:[]
    };
  }

  componentDidMount(){
    //let TakeTestId=this.props.test
    fetch('/api/v1/test?id='+this.props.testId,{ 
      headers:{
        Authorization:this.props.token
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({questionIds:data.questionsId});
        this.props.linkWithEditor(data.questionsId[0]);
      });
  }

  render(){
    if(this.state.questionIds.length!=0){
      return(
        <Fragment>
          <Menu/>
          <div className='Take-Test'>
            <QuestionList questionIds={this.state.questionIds}/>
            <div>
              <EditorTest/>
            </div>
          </div>
        </Fragment>
      );
    }
    else
    {
      return(
        <Fragment>
          <Menu/>
          <div><span>No Questions in Test</span></div>
        </Fragment>
      );
    }
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