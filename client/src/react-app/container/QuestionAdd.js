import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './QuestionAdd.css';

class Question extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <PageTitle title="Add Question" />
        <form method="GET" action="/question" className="QuestionAddForm">
          <label>Title</label>
          <textarea name="title" rows="1" className="form-data"></textarea>
          <label>Problem</label>
          <textarea name="problem" rows="5" className="form-data"></textarea>
          <label>Input Format</label>
          <textarea name="inputFormat" rows="2" className="form-data"></textarea>
          <label>Output Format</label>
          <textarea name="outputFormat" rows="2" className="form-data"></textarea>
          <label>Note</label>
          <textarea name="note" rows="2" className="form-data"></textarea>
          <label className="mb10">Sample Testcase</label>
          <div className="testCase">
            <div>
              <label>Input</label>
              <textarea name="sampleTestcaseInput" rows="5" className="form-data"></textarea>
            </div>
            <div>
              <label>Output</label>
              <textarea name="sampleTestcaseOutput" rows="5" className="form-data"></textarea>
            </div>
          </div>
          <label className="mb10">Main Testcase</label>
          <div className="testCase">
            <div>
              <label>Input</label>
              <textarea name="mainTestcaseInput" rows="5" className="form-data"></textarea>
            </div>
            <div>
              <label>Output</label>
              <textarea name="mainTestcaseOutput" rows="5" className="form-data"></textarea>
            </div>
          </div>
          <label>Explanation</label>
          <textarea name="explanation" rows="2" className="form-data"></textarea>
          <label>Max Score</label>
          <input type="text" name="maxScore" className="form-data" />
          <label>Difficulty</label>
          <select name="difficulty" className="form-data">
            <option value="easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>

          <input type="submit" value="Submit" name="submit" className="button" />
        </form>
      </div>
    );
  }
}

export default Question;