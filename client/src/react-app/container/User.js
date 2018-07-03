import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

import './User.css';
import Menu from '../component/Menu';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      practicedQuestions: [],
      attemptedTest: [] //with Developer User test took parsedJSON appended 
    };
  }

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/users', {
      method: 'GET',
      headers: {
        Authorization: this.props.token //value from redux
      }
    })
      .then((res) => res.json())
      .then((parsedJSON) => {

        this.setState({
          userDetails: parsedJSON.userDetails[0],
          practicedQuestions: parsedJSON.PracticeQuestionList,
          attemptedTest: parsedJSON.allTestList
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!localStorage.getItem('ptok') || !localStorage.getItem('type') == 'developer') {
      return <Redirect to='/' />;
    }

    const { userDetails, practicedQuestions, attemptedTest } = this.state;

    let testUI = 'Not Yet Attempted';
    if (attemptedTest) {

      testUI = attemptedTest.map((test, index) => {
        return (
          <div key={index} className="Card">
            <p className="Title">{test.title}</p>
            <p className="Description">{test.description}</p>
            <p className="Description">{test.startDate} to {test.endDate}</p>
          </div>
        );
      });
    }

    let practicedQuestionsUI = 'Not Yet Attempted';
    if (practicedQuestions) {
      practicedQuestionsUI = practicedQuestions.map((question, index) => {
        return (<div className="Card" key={index}>{question.title}</div>);
      });
    }

    return (
      <Fragment>

        <Menu />
        <section className="Card Profile">
          <h1><u>Profile</u></h1>
          <h1>{userDetails.name}</h1>
          <h3>Role: {userDetails.type}</h3>
          <h3>Mobile: {userDetails.mobile}</h3>
          <h3>Email: </h3>
        </section>

        <section className="Profile">
          <h1><u>Attempted Questions</u></h1>
          <div className="TestGrid">
            {practicedQuestionsUI}
          </div>
        </section>;

        <section className="Profile">
          <h1><u>Attempted Test</u></h1>
          <div className="TestGrid">
            {testUI}
          </div>
        </section>;
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.getToken.token
  };
};

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(User);