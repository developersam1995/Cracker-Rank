import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './Practice.css';
import QuestionItem from '../component/QuestionItem';
import Editor from './Editor';
import { Redirect } from 'react-router-dom';
import Home from '../container/Home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Login from './Login';


class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      questionId: null,
      isLoggedIn: null
    };
    this.setQuestionID = this.setQuestionID.bind(this);
  }

  setQuestionID(id) {
    //get the selected question id
    this.props.linkPracticeWithEditor(id);
    this.setState({
      questionId: id
    });
  };

  componentDidMount() {
    if (!localStorage.getItem('ptok')) {
      console.log('hey u are here');
      this.setState({isLoggedIn: '1234'});
    }

    fetch('http://localhost:4001/api/v1/question?id=all', {
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    }).then((response) => {
      return response.json();
    }).then(data => {
      this.setState({ questions: data });
    }).catch(error => {
      console.log('error', error);
    });
  }

  render() {
    if(this.state.isLoggedIn) {
      return <Redirect to='/' />;     
    }
    if (this.state.questionId) {
      return <Redirect to='/editor' />;
    }
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

    return (
      <React.Fragment>
        <Menu />
        {displayUI}
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     questionId: state.questionId
//   };
// }

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapStateToDispatch)(Practice);
//export default Practice;