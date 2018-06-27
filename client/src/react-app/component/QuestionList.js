import React from 'react';


class QuestionList extends React.Component{
  constructor(){
    super(props);
    this.state={
      questions:{}
    };
  }

  componentDidMount(){
    let questionIds=this.props.questionIds;

    let arrQuestions=new Array(questionIds.length);
    
    questionIds.forEach((val,index)=>{
      arrQuestions[index]=this.getQuestionDetails(val);
    });

    Promise.all(arrQuestions).then((questions)=>{
      this.setState({questions:questions});
    });
  }

  getQuestionDetails(questionId){
    return Promise(function(resolve,reject){
      fetch('http://localhost:4001/api/v1/question?id=questionId')
        .then((res)=>res.json())
        .then((question)=>{
          resolve(question);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  }

  render(){
    return(
      <div className='Question-List'>
        {
          this.state.questions.map((val,index)=>{
            return (<div key={index}>{val.problem} </div>);
          })
        }
      </div>
    );
  }
  
};

export default QuestionList;
