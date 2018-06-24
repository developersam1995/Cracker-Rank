import React from 'react';
import './Editor.css';

import Menu from '../component/Menu';
import Question from '../component/Question';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/actionCreators';


class Editor extends React.Component {
  // componentDidMount() {
  //     fetchAPI('https://private-a6bb7-crackerrank2.apiary-mock.com/question').then(response => {
  //         console.log(response)
  //     }).catch(error => {
  //         console.log(error);
  //     })
  // }
  constructor(props){
    super(props);
    

    this.state={
      question:{}
    };
  }

  componentDidMount(){
    fetch('http://localhost:4001/api/v1/question?query='+this.props.questionId)
      .then(res=>res.json())
      .then((question)=>{
        this.setState({question:question});
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  render() {
    if(this.state.question){
      
      const question = this.state.question;
      
      return (
        <React.Fragment>
          <Menu />
          <Question question={question} />
          <div className='Editor'>
            <div className='code'>
              <textarea defaultValue="#Write your code here">
              
              </textarea>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    questionId:state.linkEditer.questionId
  };
};

function mapStateToDispatch(dispatch){
  return bindActionCreators(actionCreator,dispatch);
};

export default connect(mapStateToProps,mapStateToDispatch)(Editor);
