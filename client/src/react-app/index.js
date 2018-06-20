const React = require('react');
const ReactDOM = require('react-dom');
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './container/Login';
import Home from './container/Home';
import Question from './container/QuestionAdd';
import Editor from './container/Editor';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/question" component={Question} />
            <Route path="/editor" component={Editor} />
          </Switch>
        </div>

      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));