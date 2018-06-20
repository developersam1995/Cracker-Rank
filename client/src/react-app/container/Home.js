import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import Card from '../component/Card';
import './Home.css';

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
        <div className='skills'>
          <PageTitle title='Dashboard' />
          <h2>Explore Your Skill</h2>
          <div className='LangGrid'>
            {codingCategory}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;