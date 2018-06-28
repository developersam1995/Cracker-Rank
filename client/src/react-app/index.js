const React = require('react');
const ReactDOM = require('react-dom');
import Routers from './Router';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './container/Login';
import Home from './container/Home';
import Question from './container/QuestionAdd';
import Editor from './container/Editor';
import AddTest from './container/AddTest';
import BusinessHome from './container/BusinessHome';
import Practice from './container/Practice';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <Routers/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));