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

import {Provider} from 'react-redux';
import {store}  from './store';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <Routers/>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));