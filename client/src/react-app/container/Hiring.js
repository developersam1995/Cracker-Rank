import React from 'react';
import './Hiring.css';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import Alert from '../component/Alert';
import ReactLoading from 'react-loading';

class Hiring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hiring: [],
      appliedStatus: '',
      isLoaded: false
    };
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('ptok')) {
    }

    fetch('http://localhost:4001/api/v1/test?id=all', {
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    }).then((response) => {
      return response.json();
    }).then(data => {
      this.setState({ hiring: data, isLoaded: true });

    }).catch(error => {
      console.log('error', error);
    });
  }

  register(id) {
    fetch('http://localhost:4001/api/v1/test', {
      method: 'post',
      headers: {
        'Authorization': localStorage.getItem('ptok'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((response) => {
      return response.json();
    }).then(response => {
      this.setState({ appliedStatus: response.status });
    }).catch(error => {
      console.log('error', error);
    });
  }

  render() {
    const { hiring } = this.state;

    let hiringUI = null;
    if (hiring) {
      hiringUI = hiring.map((test, index) => {
        return (
          <div key={index} className="Card Hiring" onClick={() => this.register(test._id)}>
            <p className="h1">{test.companyId.$oid}</p>
            <p className="h2">{test.title}</p>
            <p className="h3">{test.description}</p>
            {/* <p>{test.quesionId.length}</p> */}
            <p className="h4">{test.startDate}</p>
            <p className="h4">{test.endDate}</p>
            {/* <p>{test.registeredCandidates.length}</p> */}
            <button>Apply </button>
          </div>
        );
      });
    }

    let alertSuccess = null;
    if (this.state.appliedStatus) {
      alertSuccess = <Alert message={this.state.appliedStatus} />;
    }


    let content = null;

    if (this.state.isLoaded) {
      content = <React.Fragment>
        {alertSuccess}
        <div className="HiringList">
          {hiringUI}
        </div>
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
        <PageTitle title="Current Hiring"/>
        {content}
      </React.Fragment>
    );
  }
}

export default Hiring;