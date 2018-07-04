import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './QuestionAdd.css';

const fetch = window.fetch.bind(window);

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      problemDescription: '',
      exampleInputs: '',
      exampleOutput: '',
      testCases: [],
      functionName: '',
      paramNames: ''
    };

    this.onChange = this.onChange.bind(this);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.onload = () => {
      this.setState({ testCases: JSON.parse(fr.result) });
    };
    fr.readAsText(file);
  }

  validateAndSubmit(event) {
    event.preventDefault();

    //validate
    const initState = {
      title: '',
      problemDescription: '',
      exampleInputs: '',
      exampleOutput: '',
      testCases: [],
      functionName: '',
      paramNames: ''
    };

    const question = {
      title: this.state.title,
      problemDescription: this.state.problemDescription,
      exampleInputs: this.state.exampleInputs,
      exampleOutput: this.state.exampleOutput,
      functionName: this.state.functionName,
      paramNames: this.state.paramNames.split(','),
      testCases: this.state.testCases
    };

    console.log(JSON.stringify(question));

    fetch('/api/v1/question', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(question)
    }).then(res => {
      if(res.status == 201){
        this.setState(initState);
        alert('Created');
      }
      else alert('Error');
    }).catch(err => {
      console.log(err);
    });
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
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Problem Description: </label> <br />
            <textarea name="problemDescription" value={this.state.problemDescription}
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Example Inputs: </label> <br />
            <input type="text" name="exampleInputs" value={this.state.exampleInputs}
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Example output: </label> <br />
            <input type="text" name="exampleOutput" value={this.state.exampleOutput}
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Function name: </label> <br />
            <input type="text" name="functionName" value={this.state.functionName}
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Function parameter names (comma separated): </label> <br />
            <input type="text" name="paramNames" value={this.state.paramNames}
              onChange={this.onChange} required />
          </div>
          <br />

          <div>
            <label>Upload test cases file: </label> <br />
            <input type="file" name="testCases"
              onChange={this.uploadFile} required />
          </div>
          <br />

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default Question;