/*global $*/
import React, { Component, Fragment } from 'react';

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

import {connect} from 'react-redux';

class CodeEditor extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state={
      languageList:[]
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps!==this.props){
      
    }
  }

  componentDidMount() {
    //geting all language list from jude0
    fetch('https://api.judge0.com/languages')
      .then(res => res.json())
      .then((languages) => {
        this.setState({ languageList: languages });
      })
      .catch((error) => {
        console.log(error);
      });

    let textarea = this.myRef.current;
    this.editor = codeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      mode: { name: 'javascript', globalVars: true },
      theme: 'neo'
    });
    return this.editor;
  }

  componentDidUpdate(){
    //$('textarea')[0].value= this.state.query;
  }

  update() {
    let codeEditorCode = this.editor.getValue();

    let sourceCode = codeEditorCode.split('\n').join('\\n');
    let newSourceCode = codeEditorCode;
    let languageId = this.refs.languageSelector.value;

    let testCase = this.props.testCases;
    let len=testCase.length;
    let count=0;
    let results = new Array(len);
    testCase.forEach((val,index) => {
      let ipt = val.input.join('\n');
      let opt = '';
      
      opt += val.output;
      results[count++]=this.judge0Evaluation(languageId, ipt, opt, newSourceCode);
    });
    Promise.all(results)
      .then((values)=>{
        let score = 0;
        if(values[0].stderr!=null){
          this.props.updateResult(values[0].stderr);
        }else{
          let status=values.map((val)=>{
            return val.status.description;
          });
          this.props.updateResult(status);
        }
      });
  }
  judge0Evaluation(lanId, stdIn, expectedOutput, srcCode) {
    let data={
      'source_code':srcCode,
      'language_id':lanId,
      'stdin':stdIn,
      'expected_output':expectedOutput
    };
    data=JSON.stringify(data);
    return new Promise(function (resolve, reject) {
      fetch('https://api.judge0.com/submissions?wait=true', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:data
      })
        .then((res) => res.json())
        .then((status) => {
          resolve(status);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  submitTest(){
    
    this.props.submitTestResult();
  }

  submitPractice(){
    this.props.submitPractice();
  }

  render() {

    if(this.props.editorFor=='editorForTest'){
      return (
        <Fragment>
          <button onClick={this.update.bind(this)} className='submit-button'>Compile Code</button>
          <select className='Language-Selector' ref='languageSelector'>
            {
              this.state.languageList.map((val,index)=>{
                return <option key={index} value={val.id} >{val.name}</option>;
              })
            }
          </select>
          <br /><br /><br /><br />
          <div className='code-editor'>
            <textarea className='CodeMirror' ref={this.myRef}></textarea> {/*defaultValue={initialCode} */}
            <span>(Note: Submit test after compliting all questons, <br/>and last compiled result for the seperate questions are taken as final results to submit)</span>
            <button onClick={this.submitTest.bind(this)} className='submit-button'>Submit Test</button>
          </div>
        </Fragment>
      );
    }else{
      return (
        <Fragment>
          <button onClick={this.update.bind(this)} className='submit-button'>Compile Code</button>
          <select className='Language-Selector' ref='languageSelector'>
            {
              this.state.languageList.map((val,index)=>{
                return <option key={index} value={val.id} >{val.name}</option>;
              })
            }
          </select>
          <br /><br /><br /><br />
          <div className='code-editor'>
            <textarea className='CodeMirror' ref={this.myRef}></textarea> {/*defaultValue={initialCode} */}
            <button onClick={this.submitPractice.bind(this)} className='submit-button'>Submit</button>
          </div>
        </Fragment>
      );
    }      
    
  }
}

function mapStateToProps(state){
  return {
    editorFor:state.linkEditor.editorFor
  };
}

export default connect(mapStateToProps,null)(CodeEditor);
