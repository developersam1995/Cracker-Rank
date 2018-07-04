import React from 'react';
import './ResultsTest.css';

const ResultTest = (props) => {
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
  }
  return (
    <ul className='results-card'>
      {testResults}
    </ul>
  );
};

export default ResultTest;