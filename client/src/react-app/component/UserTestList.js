import React from 'react';

import './UserTestList.css';

class UserTestList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      testDet:[]
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({testDet:nextProps.testDet});
    console.log(this.state.testDet);
  }

  componentDidMount(){

  }

  render(){
    let strDate = new Date(),dd,mm=strDate.getMonth()+1;
    dd=(strDate.getDate()<10?'0'+strDate.getDate():strDate.getDate());
    mm=(mm<10?'0'+mm:mm);
    let todaysDate=strDate.getFullYear()+'-'+mm+'-'+dd;
    let arrAllTest = this.state.testDet;
    return(
      <div className='User-Test-List'>
        <div className='User-Test-List-Header'>
          Tests Taken By you
        </div>
        <div>
          {
            arrAllTest.map((val,index)=>{
              if(val.test_taken===true){
                return(
                  <div key={index} className='User-Test-Details done'>
                    <div className='User-Test-Det-Title'><span>Test Title:</span></div><span>{val.title}</span>
                    <div className='User-Test-Det-Title'><span>Description:</span></div><span>{val.description}</span>
                    <div className='User-Test-Det-Title'><span>Score:</span></div><span>{val.candidates[0].result[0]}</span>
                    <div className='User-Test-Det-Title'><span>Date:</span></div><span>{val.startDate}(Start date) - {val.endDate}(End date)</span>
                    <div className='User-Test-Det-Title'><span>Test by:</span></div><span>{val.company_details[0].name}</span>
                    <div className='User-Test-Det-Title'><span>Address:</span></div><span>{val.company_details[0].address}</span>
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}

export default UserTestList;
