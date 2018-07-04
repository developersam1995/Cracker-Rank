import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './QuestionItem.css';

const QuestionItem = (props) => {
  const question = props.question;
  return (
    <div className='QuestionItem' key={question.index} onClick={props.method.bind(this,props.question.question._id)} >
      <p>{question.question.title}</p>
      <p className='info'> <strong>Difficulty:</strong> <span>{question.question.difficulty}</span>
      </p>
    </div>
  );
};

export default QuestionItem;