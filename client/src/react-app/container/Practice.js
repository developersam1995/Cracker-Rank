import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './Practice.css';
import QuestionItem from '../component/QuestionItem';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import ReactLoading from 'react-loading';


class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      questionId: null,
      isLoggedIn: null,
      isLoaded: false
    };

    this.setQuestionID = this.setQuestionID.bind(this);
  }

  setQuestionID(id) {
    //get the selected question id
    //TODO:

    this.props.linkPracticeWithEditor(id);
    this.setState({
      questionId: _id
    });
  };

  componentDidMount() {
    if (!localStorage.getItem('ptok')) {

      this.setState({ isLoggedIn: '1234' });
    }

    fetch('/api/v1/question?id=all', {
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    }
    ).then((response) => {
      return response.json();
    }).then(data => {
      this.setState({ questions: data, isLoaded: true });
    }).catch(error => {
      console.log('error', error);
    });
  }


  render() {
    if (this.state.isLoggedIn) {
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
        <h2>Show your skills</h2>
        <div>
          {questionItems}
        </div>
      </div>;
    // }

    // if (!this.state.questions) {
    //   questionsUI = <Editor data={this.state.QuestionID}/>;
    // }

    let content = null;

    if (this.state.isLoaded) {
      content = <React.Fragment>
        {displayUI}
      </React.Fragment>;
    } else {
      content =
        <div className="Loading">
          <ReactLoading type={'spinningBubbles'} color={'#5c7183'} height={200} width={100} />
        </div>;
    }
    return (
      <React.Fragment>
        <Menu />
        <PageTitle title='Practice' />
        {content}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionId: state.questionId
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapStateToDispatch)(Practice);
//export default Practice;