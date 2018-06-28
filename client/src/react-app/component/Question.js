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
          <pre>{question.problemDescription}</pre>
          <p className='title'>Input Format</p>
          <p>{question.exampleInputs}</p>
          <p className='title'>Output Format</p>
          <p>{question.exampleOutput}</p>

          {/* <p className='title'>Note</p>
             <p>{question.note}</p>

             <p className='title'>Sample Testcase</p> */}

          {/* {question.sampleTestcase.map((testcase,index) => {
            return (
              <div key={index}>
                <p className='title'>Input </p>
                <p>{testcase.input}</p>
                <p className='title'>Output</p>
                <pre>{testcase.output}</pre>
              </div>
            );
          })} */}


          {/* <p className='title'>Explanation</p>
          <p>{question.explanation}</p> */}
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
