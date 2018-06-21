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
      question: {
        'id': '1',
        'title': 'Pattern draw',
        'problem': `Consider a staircase of size n = 4:
                         #
                        ##
                       ###
                      ####

Observe that its base and height are both equal to n, and the image is drawn using # symbols and spaces. The last line is not preceded by any spaces.
Write a program that prints a staircase of size n.`,
        'inputFormat': 'A single integer, n , denoting the size of the staircase.',
        'outputFormat': 'Print a staircase of size n using # symbols and spaces.',
        'note': 'The last line must have 0 spaces in it.',
        'sampleInput': [
          {
            input: 6,
            output: `
                           #
                          ##
                         ###
                        ####
                       #####
                      ######`
          }],
        'explanation': 'The staircase is right-aligned, composed of # symbols and spaces, and has a height and width of n=6.',
        'difficulty': 'easy',
        'maxScore': 10,
        'author': 'Jubin'
      },
      result: {
        didPass: 'passed'
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

  updateResult(val) {
    if (val) {
      this.setState({ result: {didPass: 'Passed'}});
    }
    else {
      console.log('running');
      this.setState({ result: {didPass: 'Failed'} });
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
    const { question } = this.state;
    return (
      <React.Fragment>
        <Menu />
        <Question question={question} />
        <div className='Editor'>
          <div className='code'>
            <CodeEditor evaluator={this.eval} updateResult={this.updateResult}/>
          </div>
        </div>
        <ResultCard result={this.state.result.didPass} />
      </React.Fragment>
    );
  }
}

export default Editor;
