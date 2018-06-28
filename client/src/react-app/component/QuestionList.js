import React from 'react';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

import './QuestionList.css';

class QuestionList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      questionIds:[]
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({questionIds:nextProps.questionIds});
  }

  render(){
    return(
      <div className='Question-List'>
        <span className='Question-List-Header'>Question List </span>
        <ul className='Question-List-ul'>
          {
            this.state.questionIds.map((val,index)=>{
              return (<li className='Question-List-li' key={index} onClick={()=>this.props.linkWithEditor(val)}>question {index+1} </li>);
            })
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) =>{
  return{
    questionId:state.linkEditer.questionId
  };
};

const mapStateToDispatch = (dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(QuestionList);
