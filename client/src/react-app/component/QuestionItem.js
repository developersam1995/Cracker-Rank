import React from 'react';
import './QuestionItem.css';

const QuestionItem = (props) => {
  const question = props.question;
  return (
    <div className="QuestionItem">
      <p>{question.title}</p>
      <p><button className="btn">+</button></p>
    </div>
  );
};

export default QuestionItem;