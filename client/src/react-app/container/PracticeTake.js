import React, { Fragment } from 'react';
import './PracticeTake.css';
import Menu from '../component/Menu';
import Editor from '../component/Editor';

class PracticeTake extends React.Component {
  render() {
    return(
      <Fragment>
        <Menu/>
        <Editor/>
      </Fragment>
    );
  };
}

export default PracticeTake;
