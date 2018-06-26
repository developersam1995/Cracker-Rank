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
      paramNames: ''
    };

    this.onChange = this.onChange.bind(this);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  validateAndSubmit(event) {
    event.preventDefault();

    //validate

    const question = {
      title: this.state.title,
      problemDescription: this.state.problemDescription,
      exampleInput: this.state.exampleInput,
      exampleOutput: this.state.exampleOutput,
      functionName: this.state.functionName,
      paramNames: this.state.paramNames.split(',')
    };

    console.log(question);

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
              onChange={this.onChange} required/>
          </div>
          <br/>

          <div>
            <label>Problem Description: </label> <br />
            <textarea name="problemDescription" value={this.state.problemDescription}
              onChange={this.onChange} required/>
          </div>
          <br />

          <div>
            <label>Example Inputs: </label> <br />
            <input type="text" name="exampleInput" value={this.state.exampleInput}
              onChange={this.onChange} required/>
          </div>
          <br/>

          <div>
            <label>Example output: </label> <br />
            <input type="text" name="exampleOutput" value={this.state.exampleOutput}
              onChange={this.onChange} required/>
          </div>
          <br/>

          <div>
            <label>Function name: </label> <br />
            <input type="text" name="functionName" value={this.state.functionName}
              onChange={this.onChange} required/>
          </div>
          <br/>

           <div>
            <label>Function parameter names(comma separated): </label> <br />
            <input type="text" name="paramNames" value={this.state.paramNames}
              onChange={this.onChange} required/>
          </div>
          <br/>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Question;