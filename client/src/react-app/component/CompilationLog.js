import React from 'react';
import './CompilationLog.css';

const CompilationLog = (props) =>{
  const { log } = props;
  let compilationLog = [];
  if(typeof(log)=='string'){
    compilationLog = props.log.split('\n');
  }

  return(
    <div className='Compilation-Log'>
      <span className='Compilation-Log-Header'>Compilation Log:</span>
      <br/>
      <div className='Compilation-Log-det'>
        {
          compilationLog.map((val,index)=>{
            return (<p key={index}>{val}</p>);
          })
        }
      </div>
    </div>
  );
};

export default CompilationLog;
