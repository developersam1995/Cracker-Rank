import React, { Fragment } from 'react';

import Menu from '../component/Menu';
import Question from '../component/Question';
import QuestionList from '../component'
import './Editor.css';
import './BusinessTest.css';

class BusinessTest extends React.Component{

  constructor(){
    super(props);
    state={
      businessTestDet:{},
      currentQuestion:{}
    };
  }

  componentDidMount(){
    //let businessTestId=this.props.test
    fetch('http://localhost:4001/api/v1/test?id=',)
      .then((res)=>res.json())
      .then((data)=>{

      });
  }

  render(){
    return(
      <Fragment>
        <Menu timer='00:20:00'/>
        <div className='Business-Test'>
          <QuestionList questionIds={this.state.businessTestDet.questions}/>
          <div>
            <Question question={this.state.currentQuestion}/>
            <div className='Editor'>
              <div className='code'>
                <CodeEditor/>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default BusinessTest;