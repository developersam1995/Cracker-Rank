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
      history: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:4001/api/v1/test')
      .then(function (response) {
        return response.json();
      })
      .then(parsedJSON => {
        this.setState({ history: parsedJSON });
      });
  }

  render() {

    let histroyList = null;
    if (this.state.history) {
      histroyList = this.state.history.map((history, index) => {
        return <HistoryCard key={index} history={history} />;
      });
    }

    return (
      <React.Fragment>
        <Menu />
        <PageTitle title="Dashboard" />
        <div className="BusinessHome">
          <div className="HistroyList">
            <h1>Your History</h1>
            <div className="HistoryCard Bold">
              <p>Date</p>
              <p>Title</p>
              <p>Questions</p>
              <p>Candidates</p>
            </div>
            {histroyList}
          </div>
          <div className="SideBar">
            <button> <Link to="/test"> Add a test</Link></button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessHome;