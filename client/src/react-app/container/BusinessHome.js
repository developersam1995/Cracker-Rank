import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import HistoryCard from '../component/HistoryCard';
import './BusinessHome.css';

class BusinessHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          date: '20-jun-2018',
          title: 'Python developer hiring',
          questions: 3,
          totalCandidate: 150
        }, {
          date: '29-jun-2018',
          title: 'Java developer hiring',
          questions: 4,
          totalCandidate: 150
        }, {
          date: '10-july-2018',
          title: 'FullStack developer hiring',
          questions: 2,
          totalCandidate: 150
        }
      ]
    };
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
            <button>Add a test</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessHome;