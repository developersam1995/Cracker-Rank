import React from 'react';
import './PageTitle.css';

const PageTitle = (props) => {
  return (
    <div className='PageTitle'>
      <p className='title'>{props.title}</p>
    </div>
  );
};

export default PageTitle;