import React from 'react';
import './PageTitle.css';

class PageTitle extends React.Component{
  constructor(props){
    super(props);

    this.state={
      title:'',
      timer:null,
      arrTime:[]
    };
  }

  componentDidMount(){
    this.setState({title:this.props.title});
    if(this.props.timer){
      let time=this.props.timer.split(':');
      time=time.map((val)=>parseInt(val));
      this.setState({
        arrTime:time,
        timer:this.props.timer
      });
    }else if(this.state.timer=='00:00'){
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
      }
    }
  };

  render(){
    if(this.state.timer){
      return (
        <div className='PageTitle'>
          <p className='title'>{this.state.title}</p>
          <span className='Timer'>Timer:{this.state.timer}</span>
        </div>
      );
    }else{
      return (
        <div className='PageTitle'>
          <p className='title'>{this.state.title}</p>
        </div>
      );
    }
  }
};

export default PageTitle;