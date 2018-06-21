import React, { Component } from 'react';

import codeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/theme/neo.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint.js';
import './CodeEditor.css';

class CodeEditor extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let textarea = this.myRef.current;
    this.editor = codeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      mode: { name: 'javascript', globalVars: true },
      theme: 'neo'

    });

    return this.editor;
  }

  evalAndUpdate() {
    let ø = Object.create(null);
    let testCase = this.props.testCases[0];
    let expectedOutput = Number(testCase.output);
    let inputs = testCase.input.split(' ').map((ele)=>Number(ele));
    eval.call(ø,this.editor.getValue());
    if(evaluate)
      var result = this.props.evaluator(evaluate, inputs, expectedOutput);
    this.props.updateResult(result.success);  
  }

  render() {
    return (
      <div>
        <textarea ref={this.myRef} />
        <button onClick={this.evalAndUpdate.bind(this)}>Submit</button>
      </div>

    );
  }
}

export default CodeEditor;
