import React from 'react';
import './QuestionItem.css';

const QuestionItem = (props) => {
  const question = props.question;
  return (
    <div className="QuestionItem">
      <p>{question.title}</p>
      <p><button onClick={props.method.bind(this,props.question.question.id)}className="btn">+</button></p>
    </div>
  );
};

export default QuestionItem;