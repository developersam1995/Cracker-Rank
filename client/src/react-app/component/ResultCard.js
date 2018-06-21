import React from 'react';

const Card = (props) => {
  return(
    <div className='Card'>
      <p>{props.result}</p>
    </div>
  );
};

export default Card;