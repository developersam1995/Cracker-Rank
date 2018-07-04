const React = require('react');
const ReactDOM = require('react-dom');
import Routers from './Router';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
