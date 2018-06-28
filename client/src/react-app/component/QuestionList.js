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
    console.log('question list com will rec',nextProps.questionIds);
    this.setState({questionIds:nextProps.questionIds});
    // if(nextProps.questionIds){
    //   let questionIds=nextProps.questionIds;
    //   console.log(questionIds);
    //   let arrQuestions=new Array(questionIds.length);
    //   questionIds.forEach((val,index)=>{
    //     arrQuestions[index]=this.getQuestionDetails(val);
    //   });

    //   Promise.all(arrQuestions).then((questions)=>{
    //     console.log('dddd',questions);
    //     // console.log('reaching...');
    //     // this.setState({questions:questions});
    //     // console.log(this.state.questions);
    //   });
    //}
  }

  getQuestionDetails(questionId){
    console.log('ques',questionId);
    return new Promise(function(resolve,reject){
      fetch(`http://localhost:4001/api/v1/question?id=${questionId}`)
        .then((res)=>res.json())
        .then((question)=>{
          console.log('qqdata',question);
          resolve(question);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  }

  render(){
    // if(this.state.questionIds){
    return(
      <div className='Question-List'>
        <span className='Question-List-Header'>Question List </span>
        <ul className='Question-List-ul'>
          {
            this.state.questionIds.map((val,index)=>{
              return (<li className='Question-List-li' key={index} onClick={() => {this.props.linkWithEditor(val)}}>question {index+1} </li>);
            })
          }
        </ul>
      </div>
    );
    // }else{
    //   return(
    //     <div className='Question-List'>

    //     </div>
    //   );
    // }
  }
};

const mapStateToProps = (state) =>{
  console.log('ques state',state);
  return{
    questionId:state.linkEditer.questionId
  };
};

const mapStateToDispatch = (dispatch)=>{
  return bindActionCreators(actionCreators,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(QuestionList);
