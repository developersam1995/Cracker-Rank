import React from 'react';
import './ResultsCard.css';

const ResultCard = (props) => {
  console.log(props.qId);
  const { results } = props;
  let testResults;
  let numberPassed = results.reduce(((n, ele) => {
    return n + ele;
  }), 0);
  if (results[0] == 'Syntax Error')
    testResults = [<li key='0' className='test-results'>Syntax Error</li>];

  else if (!results.length) testResults = [<li key='0' className='test-results'>Test Results</li>];

  else {
    testResults = results.map((result, idx) => {
      if (!result)
        return <li key={idx} className='test-results'>Test case {idx + 1} : Failed</li>;
      return <li key={idx} className='test-results'>Test case {idx + 1} : Passed</li>;
    });
    testResults.push(<li key='res' className='test-results'>
      {numberPassed} test case(s) passed, <br />
      out of {results.length} test cases</li>);
    if (numberPassed == results.length) {
      fetch('http://localhost:4001/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization':localStorage.getItem('ptok')
        },
        body: JSON.stringify({practicedQn:props.qId})
      }).then(res => {
        if (res.status == 202) {
          alert('Successfully Completed');
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
  return (
    <ul className='results-card'>
      {testResults}
    </ul>
  );
};

export default ResultCard;