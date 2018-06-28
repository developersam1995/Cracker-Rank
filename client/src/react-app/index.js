const React = require('react');
const ReactDOM = require('react-dom');
import Routers from './Router';
import './index.css';

// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <Routers/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));