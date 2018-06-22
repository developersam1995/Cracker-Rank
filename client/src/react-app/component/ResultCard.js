import React from 'react';
import './ResultsCard.css';

const ResultCard = (props) => {
  console.log(props.results);
  let testResults;
  if (props.results[0] == 'Syntax Error') 
    testResults = [<li key='0' className='test-results'>Syntax Error</li>];
  else {
    testResults = props.results.map((result, idx) => {
      if (!result) return <li key={idx} className='test-results'>Test case {idx+1} : Failed</li>;
      return <li key={idx} className='test-results'>Test case {idx+1} : Passed</li>;
    });
  }
  return (
    <ul className='Card results-card'>
      {testResults}
    </ul>
  );
};

export default ResultCard;