import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import HistoryCard from '../component/HistoryCard';
import './BusinessHome.css';
import { Link } from 'react-router-dom';

class BusinessHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    this.handledelete = this.handledelete.bind(this);
  }

  handledelete(h) {
    let statusCode;
    fetch(`http://localhost:4001/api/v1/test?id=${h}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('ptok'),
        }
      }).then( (response) => {
      statusCode = response.status;
      if(statusCode == 200) {
        let prevHistory = this.state.history;
        return this.setState({history: 
          prevHistory.filter((test) => test._id!=h)});
      }
      return response.json();
    })
      .then(parsedJSON => {
        console.log('json data', parsedJSON);
        // this.setState({ history: parsedJSON });
      });
  }
  // alert('your data will be deleted');


  componentDidMount() {
    fetch('http://localhost:4001/api/v1/users/',
      {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('ptok')
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(parsedJSON => {
        console.log('json data', parsedJSON);
        this.setState({ history: parsedJSON });
      });
  }


  render() {

    let histroyList = null;
    if (this.state.history) {
      console.log(this.state.history);
      histroyList = this.state.history.map((history, index) => {
        // console.log(history._id);
        return (<div className="HistoryCard Hover" key={index}>
          <p>{history.startDate}</p>
          <p>{history.title}</p>
          <p><span className="center">{history.questionsId.length}</span></p>
          <p><span className="center">{history.registeredCandidates.length}</span></p>
          <p><button className="button-circle" onClick={() => this.handledelete(history._id)}>X</button></p>
        </div>);

      });
    }

    return (
      <React.Fragment>
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
        </div>
        <div>
          <Link to="/test"> <button> Add a test</button></Link>
        </div>

      </React.Fragment>
    );
  }
}

export default BusinessHome;