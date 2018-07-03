import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import Card from '../component/Card';
import './Home.css';
import { Link } from 'react-router-dom';
import QuestionItem from '../component/QuestionItem';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        {
          category: 'Language Proficiency',
          title: 'JAVA',
          progress: {
            completed: 30,
            total: 100
          }
        }, {
          category: 'Language Proficiency',
          title: 'C',
          progress: {
            completed: 60,
            total: 100
          }
        }, {
          category: 'Language Proficiency',
          title: 'C++',
          progress: {
            completed: 20,
            total: 100
          }
        }, {
          category: 'Language Proficiency',
          title: 'Python',
          progress: {
            completed: 50,
            total: 100
          }
        }
      ]
    };
  }

  render() {
    const { languages } = this.state;
    let codingCategory = null;

    if (languages != null) {
      codingCategory = languages.map((language, index) => {
        return <Card key={index} language={language} />;
      });
    }

    return (
      <React.Fragment>
        <Menu />
        <div className='Home'>
          <section className="Services">
            <div className="Card Center">
              <img src="https://hrcdn.net/hackerrank/assets/home/icons/tech-467ae6718bf41bab0306a79fd43d4819.png" />
              <h1>DEVELOPERS</h1>
              <p className="Title">Practice coding. Compete. Find jobs</p>
              <p className="Description">The CrackerRank Community is the largest learning and competition community for programmers</p>
              <Link to="/profile" className="Link"><button>Solve Challenge Now</button></Link>
            </div>
            <div className="Card Center">
              <img src="https://hrcdn.net/hackerrank/assets/home/icons/developers-2ae670f9cb8d4e68c370c222d624b4d4.png" />
              <h1>COMPANIES</h1>
              <p className="Title">Assess, Screen, Interview</p>
              <p className="Description">CrackerRank for Work is the leading end-to-end technical recruiting platform for hiring engineers</p>
              <Link to="/business" className="Link"><button>Hire Now</button></Link>
            </div>
          </section>
          <section className="CompanyTag">
            <p>Evaluate Tech Skills, <span>Better</span></p>
            <p className="Description">Over 1,000 companies across industries, including VMware, Twitter and Capital One, use CrackerRank to evaluate technical candidates better.</p>
            <Link to="/Login" className="Link"><button>Try for Free</button></Link>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;