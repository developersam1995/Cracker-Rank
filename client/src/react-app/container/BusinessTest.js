import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import Menu from '../component/Menu';
import Question from '../component/Question';
import QuestionList from '../component/QuestionList';
import './Editor.css';
import './BusinessTest.css';
import Editor from './Editor';

class BusinessTest extends React.Component{

  constructor(){
    super();
    this.state={
      questionIds:[]
    };
  }

  componentDidMount(){
    //let businessTestId=this.props.test
    fetch('http://localhost:4001/api/v1/test?id=5b33d1993c81884f3b690eb3')
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
    //businessTestId:state.businessTestId
    questionId:state.linkEditer.questionId
  };
};

const mapStateToDispatch=(dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(BusinessTest);