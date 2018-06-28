const React = require('react');
const ReactDOM = require('react-dom');
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import Login from './container/Login';
import Home from './container/Home';
import Question from './container/QuestionAdd';
import Editor from './container/Editor';
import AddTest from './container/AddTest';
import BusinessHome from './container/BusinessHome';
import Practice from './container/Practice';
import BusinessTest from './container/BusinessTest';

import {store} from './store';

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
            <Route path="/business" component={BusinessHome} />
            <Route path="/businessTest" component={BusinessTest} />
            <Route path="/test" component={AddTest} />
            <Route path="/practice" component={Practice} />
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
