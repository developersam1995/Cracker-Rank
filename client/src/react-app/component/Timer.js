import React from 'react';
import './Timer.css';
// import AccountCircle from '@material-ui/icons/AccountCircle';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';

class Timer extends React.Component {
  constructor(props){
    super(props);

    this.state={
      timer:null,
      arrTime:[]
    };
  }

  componentDidMount(){
    let timer = localStorage.getItem('timer');
    if(timer){
      let time=timer.split(':');
      time=time.map((val)=>parseInt(val));
      this.setState({
        arrTime:time,
        timer
      });
    }else if(this.state.timer=='0:0:0'){
      this.props.submitTest('Time Over');
      clearInterval(this.timerID);
    }
    
    this.timerID=setInterval(()=>this.reduceTimer(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  reduceTimer(){
    if(this.state.timer==null)
      clearInterval(this.timerID);
    else{
      let hh,mm,ss;
      let time=this.state.arrTime;
      if(this.state.arrTime[2]>0){
        ss = this.state.arrTime[2];
        --ss;
        time[2]=ss;
        this.setState({
          timer:this.state.arrTime[0]+':'+this.state.arrTime[1]+':'+ss,
          arrTime:time
        });
        localStorage.setItem('timer',this.state.arrTime[0]+':'+this.state.arrTime[1]+':'+ss);
      }
      else if(this.state.arrTime[1]>0){
        mm = this.state.arrTime[1];
        --mm;
        time[1]=mm;
        time[2]=59;
        this.setState({
          timer:this.state.arrTime[0]+':'+mm+':59',
          arrTime:time
        });
        localStorage.setItem('timer',this.state.arrTime[0]+':'+mm+':59');
      }else if(this.state.arrTime[0]>1){
        hh=this.state.arrTime[0];
        --hh;
        time[0]=hh;
        time[1]=59;
        time[2]=59;
        this.setState({
          timer:hh+':59:59',
          arrTime:time
        });
        localStorage.setItem('timer',hh+':59:59');
      }else{
        this.props.submitTest('Time Over');
        clearInterval(this.timerID);
      }
    }
  };

  render() {
    if(this.state.timer!=null){
      return (
        <div className='Timer'>
          <span >Timer:{this.state.timer}</span>
        </div>
      );
    }else{
      return(
        <div className='Timer'>
          <span>Timer:00:00:00</span>
        </div>
      );
    }
  }
}

function mapStateToDispatch(dispatch){
  return bindActionCreators(actionCreators,dispatch);
}

export default connect(null,mapStateToDispatch)(Timer);
