import React from 'react';
import './Editor.css';
import Menu from '../component/Menu';
import Question from '../component/Question';
import CodeEditor from '../component/CodeEditor';
import ResultCard from '../component/ResultCard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/actionCreators';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      results: []
    };
    this.updateResult = this.updateResult.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

    fetch('http://localhost:4001/api/v1/question?id=' + this.props.questionId, {
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('ptok')
      }
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ question: json });
      });
  }

  updateResult(results) {
    this.setState({ results: results });
  }

  render() {
    if (!this.state.question) return <div style={{
      background: '#eee',
      padding: '20px',
      margin: '20px'
    }}>Loading</div>;
    const { question } = this.state;
    return (
      <React.Fragment>
        <Menu />
        <Question question={question} />
        <div className='Editor'>
          <div className='code'>
            <CodeEditor updateResult={this.updateResult}
              testCases={this.state.question.testCases}
              fnName={this.state.question.functionName}
              fnParams={this.state.question.paramNames}
            />
          </div>
          <ResultCard results={this.state.results}
            qId={this.state.question._id} />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionId: state.linkEditer.questionId
  };
};

function mapStateToDispatch(dispatch) {
  return bindActionCreators(actionCreator, dispatch);
};

export default connect(mapStateToProps, mapStateToDispatch)(Editor);






















// import React from 'react';
// import './Editor.css';
// import Menu from '../component/Menu';
// import Question from '../component/Question';
// import CodeEditor from '../component/CodeEditor';
// import ResultCard from '../component/ResultCard';

// class Editor extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//     this.state = {
//       question: null,
//       results:[]
//     };
//     this.updateResult = this.updateResult.bind(this);
//   }


//   componentDidMount() {
//     fetch('http://localhost:4001/api/v1/question?query=random')
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({ question: json });
//       });
//   }

//   updateResult(results) {
//     this.setState({ results: results });
//   }
// class Editor extends React.Component {
//   // componentDidMount() {
//   //     fetchAPI('https://private-a6bb7-crackerrank2.apiary-mock.com/question').then(response => {
//   //         console.log(response)
//   //     }).catch(error => {
//   //         console.log(error);
//   //     })
//   // }
//   constructor(props){
//     super(props);


//     this.state={
//       question:{}
//     };
//   }

//   componentDidMount(){
//     fetch('http://localhost:4001/api/v1/question?query='+this.props.questionId)
//       .then(res=>res.json())
//       .then((question)=>{
//         this.setState({question:question});
//       })
//       .catch((error)=>{
//         console.log(error);
//       });
//   }

//   render() {
// <<<<<<< HEAD
//     if (!this.state.question) return <div style={{
//       background: '#eee',
//       padding: '20px',
//       margin: '20px'
//     }}>Loading</div>;
//     const { question } = this.state;
//     return (
//       <React.Fragment>
//         <Menu />
//         <Question question={question} />
//         <div className='Editor'>
//           <div className='code'>
//             <CodeEditor updateResult={this.updateResult}
//               testCases={this.state.question.testCases} 
//               fnName={this.state.question.functionName}
//               fnParams={this.state.question.paramNames} />
// ||||||| merged common ancestors
//     const { question } = this.state;
//     return (
//       <React.Fragment>
//         <Menu />
//         <Question question={question} />
//         <div className='Editor'>
//           <div className='code'>
//             <textarea>
//               #Write your code here
//             </textarea>
// =======
//     if(this.state.question){

//       const question = this.state.question;

//       return (
//         <React.Fragment>
//           <Menu />
//           <Question question={question} />
//           <div className='Editor'>
//             <div className='code'>
//               <textarea defaultValue="#Write your code here">

//               </textarea>
//             </div>
// >>>>>>> redux-imp-question-list
//           </div>
// <<<<<<< HEAD
//           <ResultCard results={this.state.results}/>
//         </div>
//       </React.Fragment>
//     );
// ||||||| merged common ancestors
//         </div>
//       </React.Fragment>
//     );
// =======
//         </React.Fragment>
//       );
//     }
// >>>>>>> redux-imp-question-list
//   }
// }

// function mapStateToProps(state){
//   return {
//     questionId:state.linkEditer.questionId
//   };
// };

// function mapStateToDispatch(dispatch){
//   return bindActionCreators(actionCreator,dispatch);
// };

// export default connect(mapStateToProps,mapStateToDispatch)(Editor);
