import React from 'react';
import './Editor.css';
import Menu from '../component/Menu';
import Question from '../component/Question';
import CodeEditor from '../component/CodeEditor';
import EditorResultCard from '../component/EditorResultCard';
import CompilationLog from '../component/CompilationLog';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

let objScore={};
class Editor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editorFor:'',
      question: null,
      questionIds:[],
      testId:'',
      objScore:'',
      results: [],
      isLoaded: false
    };
    objScore={};
    this.updateResult = this.updateResult.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.testActivity=='Time Over'){
      alert('Time Over, Submiting the test details');
      this.submitTestResult();
    }else{
      fetch('/api/v1/question?id=' + nextProps.questionId, {
        method: 'get',
        headers: {
          'Authorization': localStorage.getItem('ptok')
        }
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ question: json, isLoaded: true });
        });
    }
  }

  componentDidMount() {
    if (this.props.questionId !== 'undefined') {
      fetch('/api/v1/question?id=' + this.props.questionId, {
        method: 'get',
        headers: {
          'Authorization': localStorage.getItem('ptok')
        }
      })
        .then((res) => res.json())
        .then((json) => {
          let testId=this.props.testId;
          let editorFor=this.props.editorFor;
          this.setState({ question: json,testId,editorFor,isLoaded: true });
        });
    }
  }

  updateResult(results) {

    //for calculating score
    let score=0;
    if(typeof(results)=='object'){
      let totalTestCases=results.length;
      let passed = 0;
      results.forEach(val => {
        if(val=='Accepted'){
          passed++;
        }
      });

      //100 score for full testcase correct
      score = (passed/totalTestCases)*100;
    }
    let id =this.props.questionId;
    alert('Score for the current question'+score);
    objScore[id]=score;
    this.setState({ results,objScore});
  }

  submitTestResult(){
    let sumOfAllQuestionScoresInTest=0;
    objScore=this.state.objScore;
    let questionIds = this.props.questionIds;
    questionIds.forEach((val)=>{
      if(objScore[val]){
        sumOfAllQuestionScoresInTest += objScore[val];
      }
    });

    let totalScoresInTest=questionIds.length*100;
    let totalScore=(sumOfAllQuestionScoresInTest/totalScoresInTest)*100;
    if(objScore) {
      let testId = this.state.testId;
      let body = {results:[totalScore],testId};
      fetch('/api/v1/test', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization':localStorage.getItem('ptok')
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (res.status == 200) {
          alert('Test score ='+totalScore+' /100');
        }else if(res.status==400){
          alert('Test Already Taken');
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  submitPractice(){
    if(this.state.objScore!=''){
      let quesId=this.state.question._id;
      fetch('/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization':localStorage.getItem('ptok')
        },
        body: JSON.stringify({practicedQn:quesId})
      }).then(res => {
        if (res.status == 202) {
          alert('Successfully Completed');
        }
      }).catch(err => {
        console.log(err);
      });
    }else{
      alert('You have not compiled the code!, Click compile and then submit');
    }
  }

  render() {
    const { question } = this.state;
    let content = null;
    if (this.state.isLoaded) {
      content = <React.Fragment>
        <Question question={question} />
        <div className='Editor'>
          <div className='code'>
            <CodeEditor
              updateResult={this.updateResult}
              submitTestResult={this.submitTestResult.bind(this)}
              submitPractice={this.submitPractice.bind(this)}
              testCases={this.state.question.testCases}
            />
          </div>
          <EditorResultCard 
            results={this.state.results}
            qId={this.state.question._id} />
          <CompilationLog log={this.state.results}/>
        </div>
      </React.Fragment>;
    } else {
      content =
        <div className="Loading">
          <ReactLoading type={'spinningBubbles'} color={'#5c7183'} height={200} width={100} />
        </div>;
    }
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    testId:state.getTest.testId,
    questionId: state.linkEditor.questionId,
    editorFor:state.linkEditor.editorFor,
    questionIds:state.question.questionIds,
    testActivity:state.submitTest.testActivity
  };
};

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(Editor);