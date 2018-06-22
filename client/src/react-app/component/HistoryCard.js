import React from 'react';
import './HistoryCard.css';

const HistoryCard = (props) => {
  const history = props.history;
  return (
    <div className="HistoryCard Hover">
      <p>{history.date}</p>
      <p>{history.title}</p>
      <p><span className="center">{history.questions}</span></p>
      <p><span className="center">{history.totalCandidate}</span></p>
    </div>
  );
};

export default HistoryCard;