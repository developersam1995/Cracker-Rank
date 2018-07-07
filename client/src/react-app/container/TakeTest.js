import React, { Fragment } from 'react';
import ReactLoading from 'react-loading';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import Menu from '../component/Menu';
import Question from '../component/Question';
import QuestionList from '../component/QuestionList';
import './TakeTest.css';
import Editor from '../component/Editor';
import PageTitle from '../component/PageTitle';
import Timer from '../component/Timer';

class TakeTest extends React.Component{

  constructor(){
    super();
    this.state={
      questionIds:[],
      isLoaded: false
    };
  }

  componentWillReceiveProps(nextProps){
    fetch('/api/v1/test?id='+nextProps.testId,{ 
      headers:{
        Authorization:localStorage.getItem('ptok')
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({questionIds:data.questionsId, isLoaded: true });
        this.props.linkWithEditor(data.questionsId[0],'editorForTest');
      });
  }

  componentDidMount(){
    fetch('/api/v1/test?id='+this.props.testId,{ 
      headers:{
        Authorization:localStorage.getItem('ptok')
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({questionIds:data.questionsId, isLoaded: true });
        this.props.linkWithEditor(data.questionsId[0],'editorForTest');
        this.props.setQuestionIds(data.questionsId);
      });
  }

  render(){
    let content = null;
    if (this.state.isLoaded) {
      if(this.state.questionIds.length!=0){
        content=
          <Fragment>
            <Menu/>
            <div className='Take-Test'>
              <QuestionList questionIds={this.state.questionIds}/>
              <div>
                <Timer/>
                <Editor/>
              </div>
            </div>
          </Fragment>;
      }
      else
      {
        content=
          <Fragment>
            <Menu/>
            <div><span>No Questions in Test</span></div>
          </Fragment>;
      }
    } else {
      content =
        <div className="Loading">
          <ReactLoading type={'spinningBubbles'} color={'#5c7183'} height={200} width={100} />
        </div>;
    }
    return (<Fragment>{content}</Fragment>);
  }
}

const mapStateToProps=(state)=>{
  return{
    testId:state.getTest.testId,
  };
};

const mapStateToDispatch=(dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(TakeTest);
