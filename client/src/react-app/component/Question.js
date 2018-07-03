import React from 'react';
import PageTitle from './PageTitle';
import './Question.css';

const Question = (props) => {
  
  const question = props.question;
  
  return (
    <div>
      <PageTitle title={question.title} />
      <div className='QuestionContainer'>
        <div className='Question'>
          <p className='title'>Problem</p>
          <pre>{question.problemDescription}</pre>
          <p className='title'>Example Input</p>
          <p>{question.exampleInputs}</p>
          <p className='title'>Example Output</p>
          <p>{question.exampleOutput}</p>

        </div>
        <div className='about'>
          <div className='status'> <span>Difficulty</span> <span className='right'>{question.difficulty}</span></div>
          <div className='status'> <span>Max Score: </span> <span className='right'>{question.maxScore}</span></div>
          <div className='status'> <span>Author: </span> <span className='right'>{question.author}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Question;
