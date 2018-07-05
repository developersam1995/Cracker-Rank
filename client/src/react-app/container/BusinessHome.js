import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './BusinessHome.css';
import { Link, Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class BusinessHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      isLoaded: false,
      testId:''
    };
    this.handledelete = this.handledelete.bind(this);
    this.handleClickId = this.handleClickId.bind(this);
  }

  handleClickId(id) {
    this.props.setTestId(id);
    this.setState({testId:id});
  }

  handledelete(h) {
    let statusCode;
    fetch(`http://localhost:4001/api/v1/test?id=${h}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('ptok'),
        }
      })
      .then((response) => {
        statusCode = response.status;
        if (statusCode == 200) {
          let prevHistory = this.state.history;
          return this.setState({
            history:
              prevHistory.filter((test) => test._id != h)
          });
        }
        return response.json();
      }).then(parsedJSON => {
        this.setState({ isLoaded: true });
      });
  }

  componentDidMount() {
    fetch('http://localhost:4001/api/v1/users/', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(parsedJSON => {
        this.setState({ isLoaded: true, history: parsedJSON });
      });
  }


  render() {
    if(this.state.testId){
      return <Redirect to='/business/test'/>;
    }
    if (!localStorage.getItem('ptok') || !localStorage.getItem('type') == 'business') {
      return <Redirect to='/' />;
    }

    let histroyList = null;
    if (this.state.history) {
      histroyList = this.state.history.map((history, index) => {
        return (
          <div className="HistoryCard Hover" key={index}>
            <p>{history.startDate}</p>
            <p>{history.title}</p>
            <p><span className="center">{history.questionsId.length}</span></p>
            <p><span className="center">{history.candidates.length}</span></p>
            <p><button className="button-circle" onClick={() => this.handledelete(history._id)}>X</button></p>
            <p className="h4" onClick={()=> this.handleClickId(history._id)}>View</p>
          </div>);

      });
    }

    let content = null;
    if (this.state.isLoaded) {
      content = <React.Fragment>
        <Menu />
        <PageTitle title="Dashboard" />
        <div className="BusinessHome">
          <div className="HistroyList" >
            <h1>Your History</h1>
            <div className="HistoryCard Bold">
              <p>Date</p>
              <p>Title</p>
              <p>Questions</p>
              <p>Candidates</p>
              <p />
            </div>

            {histroyList}
          </div>
          <Link to="/test"><button> Add a test</button></Link>
        </div>
      </React.Fragment>;
    } else {
      content =
        <div className="Loading">
          <ReactLoading type={'spinningBubbles'} color={'#5c7183'} height={200} width={100} />
        </div>;
    }

    return (<React.Fragment>{content}</React.Fragment>);
  }
}

function mapStateToDispatch(dispatch){
  return bindActionCreators(actionCreators,dispatch);
}

export default connect(null,mapStateToDispatch)(BusinessHome);