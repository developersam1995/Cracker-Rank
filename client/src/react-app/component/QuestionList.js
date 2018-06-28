import React from 'react';

import './QuestionList.css';


class QuestionList extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
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

  // componentDidMount(){
  //   console.log('question list com did mount',this.props.questionIds);
  //   if(this.props.questionIds){
  //     let questionIds=this.props.questionIds;

  //     let arrQuestions=new Array(questionIds.length);
  //     questionIds.forEach((val,index)=>{
  //       arrQuestions[index]=this.getQuestionDetails(val);
  //     });

  //     Promise.all(arrQuestions).then((questions)=>{
  //       this.setState({questions:questions});
  //     });
  //   }
  // }

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
              return (<li className='Question-List-li' key={index} >question {index+1} </li>);
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

export default QuestionList;
