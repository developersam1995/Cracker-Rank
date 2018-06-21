import React from 'react';
import Menu from '../component/Menu';
import PageTitle from '../component/PageTitle';
import './Practice.css';
import QuestionItem from '../component/QuestionItem';

class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        id: '12o1u2iu12',
        title: 'Prime number',
        difficulty: 'Easy',
        maxScore: 10
      },{
        id:'12o1u2iu12',
        title: 'Addition of numbers',
        difficulty: 'Easy',
        maxScore: 10
      },{
        id:'12o1u2iu12',
        title: 'Factorial',
        difficulty: 'Medium',
        maxScore: 50
      },{
        id:'12o1u2iu12',
        title: 'Pattern',
        difficulty: 'Hard',
        maxScore: 100
      }]
    };
  }

  render() {
    const { questions } = this.state;
    let questionItems = null;

    if (questions != null) {
      questionItems = questions.map((question, index) => {
        return <QuestionItem question={{index: index, question:question}} />;
      });
    }

    return (
      <React.Fragment>
        <Menu />
        <div className='skills'>
          <PageTitle title='Practice' />
          <h2>Show your skills</h2>
          <div>
            {questionItems}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Practice;