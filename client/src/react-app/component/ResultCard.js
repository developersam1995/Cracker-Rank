import React from 'react';

const ResultCard = (props) => {
  console.log(props.results);
  return(
    <div className='Card'>
      {props.results.map((result,idx)=>{
        if(!result) return <li key={idx}>Failed</li>;
        return <li key={idx}>Passed</li>;
      })
      }
    </div>
  );
};

export default ResultCard;