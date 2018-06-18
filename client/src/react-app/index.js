const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    render() {
        return(<div>This is me</div>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));