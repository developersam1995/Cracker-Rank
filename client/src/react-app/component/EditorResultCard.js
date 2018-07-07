import React from 'react';

import './ResultsCard.css';


import {connect} from 'react-redux';

const EditorResultCard = (props) => {
  const { results } = props;

  if(typeof(results)=='string'){
    return(
      <div className='test-case'>
        <span className='test-case-header'>Syntax Error</span>
      </div>
    );
  }else{
    let passCount;
    if(results.length!=0){
      passCount=0;
    }
    return(
      <div className='test-case'>
        <span className='test-case-header'>Test cases:</span>
        <ul className='results-card'>
          {
            results.map((val,index)=>{
              if(val=='Accepted'){
                passCount++;
              }
              return (<li key={index} className='test-results'>Test case {index+1}:{val}</li>);
            })
          }
        </ul>
        <span>No of test case passed:{passCount}</span>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    editorFor:state.linkEditor.editorFor
  };
}

export default connect(mapStateToProps,null)(EditorResultCard);