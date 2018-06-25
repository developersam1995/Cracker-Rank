import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './QuestionAdd.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      problemDescription: '',
      exampleInput: '',
      exampleOutput: '',
      testCases: [],
      functionName: '',
      paramNames: []
    };

    this.onChange = this.onChange.bind(this);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value},
      () => {
        console.log(this.state);
      });
  }

  validateAndSubmit(event) {
    event.preventDefault();

    //validate

    const question = {
      title: this.state.title,
      problemDescription: this.state.problemDescription
    };

    // fetch('url-to-post',{
    //   method: 'POST',
    //   headers: {
    //     ' content-type': 'application/json'
    //   },
    //   body: JSON.stringify(question)
    // })
    //   .then(res=> console.log(res)); 
  }

  render() {
    return (
      <div>
        <Menu />
        <PageTitle title="Add Question" />

        <form onSubmit={this.validateAndSubmit}>

          <div>
            <label>Title: </label> <br />
            <input type="text" name="title" value={this.state.title}
              onChange={this.onChange} />
          </div>
          <br/>

          <div>
            <label>Problem Description: </label> <br />
            <textarea name="problemDescription" value={this.state.problemDescription}
              onChange={this.onChange} />
          </div>
          <br />

          <div>
            <label>Example Inputs: </label> <br />
            <input type="text" name="exampleInput" value={this.state.exampleInput}
              onChange={this.onChange} />
          </div>
          <br/>

          <div>
            <label>Example output: </label> <br />
            <input type="text" name="exampleOutput" value={this.state.exampleOutput}
              onChange={this.onChange} />
          </div>
          <br/>

          <div>
            <label>Function name: </label> <br />
            <input type="text" name="functionName" value={this.state.functionName}
              onChange={this.onChange} />
          </div>
          <br/>

          

          <button type="submit">Submit</button>
        </form>
        {/* <form method="POST" action="http://localhost:4001/api/v1/question" className="QuestionAddForm">
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
        </form> */}
      </div>
    );
  }
}

export default Question;