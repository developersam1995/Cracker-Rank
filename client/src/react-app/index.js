const React = require('react');
const ReactDOM = require('react-dom');
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './container/Login';
import Home from './container/Home';
import Question from './container/QuestionAdd';
import Editor from './container/Editor';
import Practice from './container/Practice';

import {Provider} from 'react-redux';
import {store}  from './store';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/"  component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/question" component={Question} />
            <Route path="/editor" component={Editor} />
            <Route path="/practice" component={Practice} />
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));