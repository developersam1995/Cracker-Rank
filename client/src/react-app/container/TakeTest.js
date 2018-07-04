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
    console.log('take test',this.props.testId);
    fetch('http://localhost:4001/api/v1/test?id='+this.props.testId,{ //5b3b889364672758e70d36bb
      headers:{
        Authorization:this.props.token
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        console.log('take test data',data);
        this.setState({questionIds:data.questionsId});
        this.props.linkWithEditor(data.questionsId[0]);
      });
  }

  render(){
    if(this.state.questionIds.length!=0){
      return(
        <Fragment>
          <Menu/>
          <PageTitle title="Mountblue"/>
          <div className='Take-Test'>
            <QuestionList questionIds={this.state.questionIds}/>
            <div>
              <Editor/>
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
  console.log('take ',state);
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