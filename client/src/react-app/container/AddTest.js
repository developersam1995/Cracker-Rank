import React from 'react';
import './AddTest.css';
import QuestionItem from '../component/QuestionItem';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import Alert from '../component/Alert';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
class AddTest extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date().toJSON().slice(0, 10);
    this.state = {
      redirect: null,
      test: {
        company_id: '1',
        title: '',
        description: '',
        startDate: date,
        endDate: date,
        duration: '',
        questionId: []
      },
      questions: [],
      addedQuestions: [],
      alertMessage: '',
    };
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.QuestionsArry = [];
    this.addedQuestionID = [];
  }

  componentDidMount() {
    fetch('/api/v1/question?id=all', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    }).then(function (response) {
      return response.json();
    }).then(parsedJSON => {
      this.setState({ questions: parsedJSON });
    });
  }

  getQuestion(questionId, questiontitle) {
    let data = questiontitle;
    let qID = questionId;

    if (!this.QuestionsArry.includes(data)) {
      this.QuestionsArry.push(data);
      this.addedQuestionID.push(qID);
    } else {
      const indexId = this.addedQuestionID.indexOf(qID);
      const indexName = this.QuestionsArry.indexOf(data);

      this.QuestionsArry.splice(indexName, 1);
      this.addedQuestionID.splice(indexId, 1);

    }
    this.setState({ addedQuestions: this.QuestionsArry });
    let test = { ...this.state.test };
    test.questionId = this.addedQuestionID;
    this.setState({ test });
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

  handleSubmit(e) {
    if (this.isValid()) {
      console.log(JSON.stringify(this.state.test));
      fetch('/api/v1/test', {
        headers: {
          'Authorization': localStorage.getItem('ptok'),
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state.test),
      }).then(response => {
        return response.json();
      }).then(parsedJSON => {
        alert('your test has been assigned');
      }).catch(err => {
        return (err);
      });
    }
  };

  isValid() {
    let errorMsg = '';
    const { test } = this.state;

    if (test.title === '') {
      errorMsg = 'Please provide test title';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (test.description === '') {
      errorMsg = 'Please provide test description';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (test.startDate === '') {
      errorMsg = 'Please provide start date';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (test.endDate === '') {
      errorMsg = 'Please provide end date';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (test.duration === '') {
      errorMsg = 'Please provide test duration';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    if (test.questionId.length === 0) {
      errorMsg = 'Please select questions';
      this.setState({
        alertMessage: errorMsg
      });
      return false;
    }

    this.setState({
      alertMessage: errorMsg
    });
    return true;
  }

  render() {
    if (!localStorage.getItem('ptok') || !localStorage.getItem('type') == 'business') {
      return <Redirect to='/' />;
    }
    const { questions } = this.state;
    let questionListUI = null;
    if (questions) {
      questionListUI = questions.map((question, index) => {

        return (
          <div key={index} className="QuestionList">
            <p>{question.title}</p>
            <p>
              <button
                onClick={this.getQuestion.bind(this, question._id, question.title)}
                className="btn">+</button>
            </p>
          </div>
        );
      });
      if (this.state.addedQuestions) {
        this.addedquestions = this.state.addedQuestions.map((questions, index) => {
          return <div key={index} >
            <p >{questions}</p>
          </div>;
        });
      }
    }

    let alertUI = null;
    if (this.state.alertMessage) {
      alertUI = <Alert message={this.state.alertMessage} />;
    }

    return (
      <React.Fragment>
        <Menu />
        <PageTitle title="Add Test" ></PageTitle>

        <Link to="/business"><button >Back</button></Link>
        {alertUI}
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


            </div>

            <button onClick={this.handleSubmit}>SUBMIT</button>
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