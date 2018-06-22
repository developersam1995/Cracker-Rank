import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './Practice.css';
import QuestionItem from '../component/QuestionItem';
import Editor from './Editor';

class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: null,
      questions: null

    };

    this.setQuestionID = this.setQuestionID.bind(this);
  }

  setQuestionID(id) {
    //get the selected question id
    //TODO:
    
    this.setState({
      questionID: id
    });
  };


  componentDidMount() {
    fetch('http://localhost:4001/api/v1/question?query=problems').then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ questions: data });
    });
  }


  render() {

    const { questions } = this.state;
    let questionItems = null;
    if (questions != null) {
      questionItems = questions.map((question, index) => {
        return <QuestionItem key={index} method={this.setQuestionID} question={{ index: index, question: question }} />;
      });
    }

    let displayUI = null;
    // if (this.state.questions) {
    displayUI =
      <div className='Practice'>
        <PageTitle title='Practice' />
        <h2>Show your skills</h2>
        <div>
          {questionItems}
        </div>
      </div>;
    // }

    // if (!this.state.questions) {
    //   questionsUI = <Editor data={this.state.QuestionID}/>;
    // }

    return (
      <React.Fragment>
        <Menu />
        {displayUI}
      </React.Fragment>
    );
  }
}

export default Practice;