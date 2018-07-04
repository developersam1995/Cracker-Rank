import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
// import AccountCircle from '@material-ui/icons/AccountCircle';

class Menu extends React.Component {
  constructor(props){
    super(props);

    this.state={
      timer:null,
      arrTime:[]
    };
  }

  componentDidMount(){
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

  render() {
    if(this.state.timer!=null){
      return (
        <div className='Menu'>
          <div>
            <span>
              <Link to="/" className="Link">CrackerRank</Link>
            </span>
            {/* <AccountCircle className='user-icon' /> */}
            <span>
              <Link to="/practice" className="Link">Practice</Link>
            </span>
            <span>
              <Link to="/hiring" className="Link">Hiring</Link>
            </span>
          </div>
          <div>
            <span>
              <Link to="/profile" className="Link">{localStorage.getItem('name')}</Link>
            </span>
            <span>
              <button className="button-logout">Logout</button>
            </span>
            <span className='Timer'>Timer:{this.state.timer}</span>
          </div>
        </div>
      );

    }else{
      return (
        <div className='Menu'>
          <div>
            <span>
              <Link to="/" className="Link">CrackerRank</Link>
            </span>
            {/* <AccountCircle className='user-icon' /> */}
            <span>
              <Link to="/practice" className="Link">Practice</Link>
            </span>
            <span>
              <Link to="/hiring" className="Link">Hiring</Link>
            </span>
          </div>
          <div>
            <span>
              <Link to="/profile" className="Link">{localStorage.getItem('name')}</Link>
            </span>
            <span>
              <button className="button-logout">Logout</button>
            </span>
          </div>
        </div>
      );
    }
  }
}

export default Menu;
