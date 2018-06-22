import React from 'react';
import './AddTest.css';
import QuestionItem from '../component/QuestionItem';

class AddTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: '1212',
          title: 'Prime numberaskldjfklajskldfj;klajkfldjalk;sjfdl;kajslk;dfjklasjdflkjaslkdfjaslkdfjlasjdlfkjdemo'
        }, {
          id: '1212',
          title: 'Prime number'
        }, {
          id: '1212',
          title: 'Prime number'
        }, {
          id: '1212',
          title: 'Prime number'
        }, {
          id: '1212',
          title: 'Prime number'
        }, {
          id: '1212',
          title: 'Prime number'
        }, {
          id: '1212',
          title: 'Prime number'
        },
      ]
    };
  }

  render() {

    let questionList = null;
    if(!questionList) {
      questionList = this.state.questions.map((question, index)=>{
        return <QuestionItem key={index} question={question}/>;
      });
    }

    return (
      <div className="AddTest">
        <div className="Form BOX">
          <form>
            <label className="Form-Label">Title</label>
            <input className="Form-Field" type="text" name="title" />

            <label className="Form-Label">Description</label>
            <textarea className="Form-Field" name="description" rows="4"></textarea>

            <label className="Form-Label">Start Date</label>
            <input className="Form-Field" type="date" name="startPeriod" />

            <label className="Form-Label">End Date</label>
            <input className="Form-Field" type="date" name="endPeriod" />

            <label className="Form-Label">Duration(in minutes)</label>
            <input className="Form-Field" type="text" name="endPeriod" />
          </form>
        </div>
        <div className="Questions BOX">
          <h2>Questions</h2>
          {questionList}          
        </div>
      </div>
    );
  }
}

export default AddTest;