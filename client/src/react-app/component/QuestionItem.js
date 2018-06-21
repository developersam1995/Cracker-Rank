import React from 'react';
import './QuestionItem.css';

const QuestionItem = (props) => {
  console.log(props);
  const question = props.question;
  return (
    <div className="QuestionItem" key={question.index}>
      <p><a href={'/editor?='+question.question.id}>{question.question.title}</a></p>
      <p className="info"> <strong>Difficulty:</strong> <span>{question.question.difficulty}</span>  &nbsp;&nbsp; <strong>Max Score:</strong> <span>{question.question.maxScore}</span></p>
    </div>
  );
};

export default QuestionItem;