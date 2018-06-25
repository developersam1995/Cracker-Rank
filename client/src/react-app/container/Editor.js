import React from 'react';
import './Editor.css';
import Menu from '../component/Menu';
import Question from '../component/Question';
import CodeEditor from '../component/CodeEditor';
import ResultCard from '../component/ResultCard';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      question: null,
      results:[]
    };
    this.updateResult = this.updateResult.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/question?query=random')
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
        <Menu />
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

export default Editor;
