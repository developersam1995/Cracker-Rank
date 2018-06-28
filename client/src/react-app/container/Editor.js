import React from 'react';
import './Editor.css';
import Menu from '../component/Menu';
import Question from '../component/Question';
import CodeEditor from '../component/CodeEditor';
import ResultCard from '../component/ResultCard';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      results:[]
    };
    this.updateResult = this.updateResult.bind(this);
  }

  componentWillReceiveProps(nextProps){
    fetch('http://localhost:4001/api/v1/question?query='+nextProps.questionId)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ question: json });
      });
  }

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/question?query='+this.props.questionId)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ question: json });
      });
  }

  updateResult(results) {
    this.setState({ results: results });
  }

  render() {
    if (!this.state.question) return <div style={{
      background: '#eee',
      padding: '20px',
      margin: '20px'
    }}>Loading</div>;
    const { question } = this.state;
    return (
      <React.Fragment>
        {/* <Menu /> */}
        <Question question={question} />
        <div className='Editor'>
          <div className='code'>
            <CodeEditor updateResult={this.updateResult}
              testCases={this.state.question.testCases} 
              fnName={this.state.question.functionName}
              fnParams={this.state.question.paramNames} />
          </div>
          <ResultCard results={this.state.results}/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    questionId:state.linkEditer.questionId
  };
};

const mapStateToDispatch=(dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(Editor);
