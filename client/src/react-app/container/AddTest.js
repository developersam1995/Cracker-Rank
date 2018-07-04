import React from 'react';
import './AddTest.css';
import QuestionItem from '../component/QuestionItem';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';

class AddTest extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date().toJSON().slice(0, 10);
    this.state = {
      questions: [],
      addedQuestions: [],
      test: {
        company_id: '1',
        title: '',
        description: '',
        startDate: date,
        endDate: date,
        duration: '',
        questionID: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.QuestionsArry = [];
    this.addedQuestionID = [];
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { test } = this.state;
    this.setState({
      test: {
        ...test,
        [name]: value
      }
    });
  }

  getQuestion(questionId, questiontitle) {
    let data = questiontitle;
    let qID = questionId;
    if (!this.QuestionsArry.includes(data)) {
      this.QuestionsArry.push(data);
      this.addedQuestionID.push(qID);
    }
    this.setState({ addedQuestions: this.QuestionsArry });
    let test = { ...this.state.test };
    test.questionID = this.addedQuestionID;
    this.setState({ test });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:4001/api/v1/test', {
      method: 'POST',
      body: JSON.stringify(this.state.test),
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      }
    }).then(result => {
      return result.json();
    }).then(parsedJSON => {
    }).catch(err => {
      return (err);
    });
  };

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/question?query=questionlist')
      .then(function (response) {
        return response.json();
      })
      .then(parsedJSON => {
        this.setState({ questions: parsedJSON });
      });
  }
  render() {
    const { questions } = this.state;
    let questionListUI = null;
    if (questions) {
      questionListUI = questions.map((question, index) => {
        return <div key={index} className="QuestionItem">
          <p>{question.title}</p>
          <p><button onClick={this.getQuestion.bind(this, question.id, question.title)} className="btn">+</button></p>
        </div>;
      });
      if (this.state.addedQuestions) {
        this.addedquestions = this.state.addedQuestions.map((questions, index) => {
          return <div key={index} >
            <p >{questions}</p>
          </div>;
        });
      }
    }

    return (
      <React.Fragment>
        <Menu/>
        <PageTitle title="Add Test"/>
        < div className="AddTest" >
          <div className="Form BOX">
            <div>
              <label className="Form-Label" >Title</label>
              <input
                className="Form-Field"
                type="text"
                name="title"
                onChange={(event) => this.handleChange(event)} />
              <label className="Form-Label">Description</label>
              <textarea
                className="Form-Field"
                name="description"
                rows="4"
                onChange={(event) => this.handleChange(event)}
                value={this.state.test.description} />
              <label className="Form-Label">Start Date</label>
              <input
                className="Form-Field"
                type="date"
                name="startDate"
                onChange={(event) => this.handleChange(event)}
                value={this.state.test.startDate} />
              <label className="Form-Label">End Date</label>
              <input
                className="Form-Field"
                type="date"
                name="endDate"
                onChange={(event) => this.handleChange(event)}
                value={this.state.test.endDate} />
              <label className="Form-Label">Duration(in minutes)</label>
              <input
                className="Form-Field"
                type="Number"
                name="duration"
                onChange={(event) => this.handleChange(event)}
                value={this.state.test.duration} />
              <h2>ADDED QUESTIONS</h2>
              {this.addedquestions}
              <button className="Form-Submit" onClick={this.handleSubmit}>SUBMIT</button>
            </div>
          </div>
          <div className="Questions BOX">
            <h2>Questions</h2>
            <label className="Form-Label" >{questionListUI}</label>
          </div>
        </div >
      </React.Fragment>
    );
  }
}

export default AddTest;