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

  update() {
    let ø = Object.create(null);
    try {
      eval.call(ø, this.editor.getValue());
    } catch (e) {
      this.props.updateResult(['Syntax Error']);
      return false;
    }
    let definedFn = eval(this.props.fnName);
    if (!definedFn) this.props.updateResult([false]);
    else {
      let testCases = this.props.testCases;
      let results = testCases.map(testCase => {
        let expectedOutput = testCase.output;
        let inputs = testCase.input;
        let result = this.eval(definedFn, inputs, expectedOutput);
        return result.success;
      });
      this.props.updateResult(results);
    }
  }

  render() {
    let params = this.props.fnParams.join(', ');
    let functionName = `function ${this.props.fnName} (${params}) {\n\n}`;
    return (
      <div className='code-editor'>
        <textarea ref={this.myRef} defaultValue={functionName} />
        <button onClick={this.update.bind(this)} className='submit-button'>Submit</button>
      </div>
    );
  }
}

export default CodeEditor;
