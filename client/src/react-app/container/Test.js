import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import ReactLoading from 'react-loading';
import Menu from '../component/Menu';
import './Test.css';

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testDet: {},
      questions: [],
      candidates: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('/api/v1/test/profile?id=' + this.props.testId, {
      headers: {
        Authorization: this.props.token
      }
    })
      .then((res) => res.json())
      .then((testDetails) => {
        console.log(testDetails);
        this.setState({
          testDet: testDetails.test_Detail[0],
          questions: testDetails.questions,
          candidates: testDetails.candidates,
          isLoaded: true
        });
      });
  }

  render() {
    let content = null;
<<<<<<< HEAD
    let candidateDetails = this.testDet
=======
    let canDets = {};
    if(this.state.testDet.candidates && this.state.testDet.candidates.length!=0){
      this.state.testDet.candidates.forEach((val)=>{
        canDets[val.id]=val.result[0];
      });
    }
>>>>>>> 21393be5f5114ed4ec16c124b7b20f7cae838b97
    if (this.state.isLoaded) {
      content = <Fragment>
        <div className='Test-Main'>
          <div className='Test'>
            <div className='Test-Header'> Test Details</div>
            <div className='Test-Detail'>
              <div><span className='Test-Title'>Title:</span><span>{this.state.testDet.title}</span></div>
              <div><span className='Test-Title'>Description:</span><span>{this.state.testDet.description}</span></div>
              <div><span className='Test-Title'>Duration:</span><span>{this.state.testDet.duration}</span> (in min)</div>
              <div><span className='Test-Title'>Date:</span><span>{this.state.testDet.startDate}(start date)-{this.state.testDet.endDate}(end date)</span></div>
            </div>
          </div>
          <div className='Test'>
            <div className='Test-Header'>Questions In Test</div>
            {
              this.state.questions.map((val, index) => {
                return (
                  <div className='Test-Detail' key={index}>
                    <div><span className='Test-Title'>Title:</span><span>{val.title}</span></div>
                    <div><span className='Test-Title'>Problem Description:</span><span>{val.problemDescription}</span></div>
                    <div><span className='Test-Title'>Difficulty:</span><span>{val.difficulty}</span></div>
                  </div>
                );
              })
            }
          </div>
          <div className='Test'>
            <div className='Test-Header'>Candidate Details</div>
            {
              this.state.candidates.map((val, index) => {
                return (
                  <div className='Test-Detail' key={index}>
                    <div><span className='Test-Title'>Name:</span><span>{val.name}</span></div>
                    <div><span className='Test-Title'>Mobile:</span><span>{val.mobile}</span></div>
                    <div><span className='Test-Title'>Score:</span><span>{canDets[val._id]}</span></div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </Fragment>;
    } else {
      content =
        <div className="Loading">
          <ReactLoading type={'spinningBubbles'} color={'#5c7183'} height={200} width={100} />
        </div>;
    }
    return (
      <Fragment>
        <Menu />
        {content}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    testId: state.getTest.testId,
    token: state.getToken.token
  };
};

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(Test);
