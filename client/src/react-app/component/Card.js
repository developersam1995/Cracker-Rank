import React from 'react';
import './Card.css';

const Card = (props) => {
  return(
    <div className='Card'>
      <p className='category'>{props.language.category}</p>
      <p className='title'>{props.language.title}</p>
      <div className='myProgress' style={{ width:props.language.progress.total +'%' }}>
        <div className='myBar' style={{ width:props.language.progress.completed +'%' }}></div>
      </div>
      <p>{props.language.progress.completed} out of {props.language.progress.total}</p>
      <button>Continue Practice</button>
    </div>
  );
};

export default Card;