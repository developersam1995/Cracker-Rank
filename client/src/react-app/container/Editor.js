import React from 'react';
import './Editor.css';

import Menu from '../component/Menu';
import Question from '../component/Question';
import CodeEditor from '../component/CodeEditor';
import ResultCard from '../component/ResultCard';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: null,
      result: {
        didPass: null
      }
    };
    this.updateResult = this.updateResult.bind(this);
  }

  eval(testFn, args, expectedOutput) {
    let result;
    let ø = Object.create(null);
    try {
      result = testFn.apply(ø, args);
    }
    catch (err) {
      return { error: err, success: false };
    }
    // if (Array.isArray(expectedOutput)) {
    //   let areEqual = compareArrays(expectedOutput, result, doesOrderMatter);
    //   if (areEqual) return { success: true };
    // }

    if (result === expectedOutput) {
      return { success: true };
    }

    return { success: false };
  }

  componentDidMount() {
    console.log('running');
    fetch('http://localhost:4001/api/v1/question?query=5b2aacdeefafc623b89ca3f7')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ question: json });
      });
  }

  updateResult(val) {
    if (val) {
      this.setState({ result: { didPass: 'Passed' } });
    }
    else {
      console.log('running');
      this.setState({ result: { didPass: 'Failed' } });
    }
  }

  // componentDidMount() {
  //     fetchAPI('https://private-a6bb7-crackerrank2.apiary-mock.com/question').then(response => {
  //         console.log(response)
  //     }).catch(error => {
  //         console.log(error);
  //     })
  // }

  render() {
    if (!this.state.question) return <div>Loading</div>;
    const { question } = this.state;
    console.log(this.state.question);
    return (
      <React.Fragment>
        <Menu />
        <Question question={question} />
        <div className='Editor'>
          <div className='code'>
            <CodeEditor evaluator={this.eval} updateResult={this.updateResult}
              testCases={this.state.question.mainTestcase} />
          </div>
        </div>
        <ResultCard result={this.state.result.didPass} />
      </React.Fragment>
    );
  }
}

export default Editor;
