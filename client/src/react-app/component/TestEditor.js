import React from 'react';
import './TestEditor.css';
import Question from './Question';
import CodeEditor from './CodeEditor';
import ResultCard from './ResultCard';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/actionCreators';

class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      results: [],
      isLoaded: false
    };
    this.updateResult = this.updateResult.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

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

  updateResult(results) {
    this.setState({ results: results });
  }

  render() {
    const { question } = this.state;

    let content = null;
    if (this.state.isLoaded) {
      content = <React.Fragment>
        <Question question={question} />
        <div className='TestEditor'>
          <div className='code'>
            <CodeEditor updateResult={this.updateResult}
              testCases={this.state.question.testCases}
              fnName={this.state.question.functionName}
              fnParams={this.state.question.paramNames}
            />
          </div>
          <ResultCard results={this.state.results}
            qId={this.state.question._id} />
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
  return bindActionCreators(actionCreator, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(TestEditor);