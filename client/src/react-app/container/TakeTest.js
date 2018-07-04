import React from 'react';
import './TakeTest.css';
import Menu from '../component/Menu';
import Question from '../component/Question';
import TestEditor from '../component/TestEditor';
import ResultTest from '../component/ResultTest';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class TakeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      results: [],
      isLoaded: false,
      submitted: false
    };
    this.updateResult = this.updateResult.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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

  submitTest() {
    let results = this.state.results;
    let numberPassed = results.reduce(((n, ele) => {
      return n + ele;
    }), 0);
    let normalizedResult = numberPassed / results.length;
    if(this.state.submitted){
      return alert('You already submitted!');
    }
    if (confirm(`Are you sure? Your score is ${normalizedResult}`)) {
      let body = {results:[normalizedResult], testId:'5b3c996725f57039b9869ace'};
      fetch('/api/v1/test', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization':localStorage.getItem('ptok')
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (res.status == 200) {
          alert('Successfully Submitted');
          this.setState({submitted:true});
        }
      }).catch(err => {
        console.log(err);
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
          this.setState({ question: json, isLoaded: true });
        });
    }
  }

  updateResult(results) {
    this.setState({ results: results });
  }

  render() {
    const { question } = this.state;
    let content = null;
    if (this.state.isLoaded) {
      content = <React.Fragment>
        <Menu />
        <Question question={question} />
        <div className='TakeTest'>
          <div className='code-editor'>
            <TestEditor updateResult={this.updateResult}
              testCases={this.state.question.testCases}
              fnName={this.state.question.functionName}
              fnParams={this.state.question.paramNames}
            />
          </div>
          <ResultTest results={this.state.results}
            qId={this.state.question._id} />
          <button className='submit-button' onClick={this.submitTest}>Submit</button>
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
    questionId: state.linkEditer.questionId
  };
};

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(TakeTest);
