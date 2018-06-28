import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './container/Login';
import Home from './container/Home';
import Question from './container/QuestionAdd';
import Editor from './container/Editor';
import RegisterUser from './container/RegisterUser';
import RegisterBusiness from './container/RegisterBusiness';
import NotFound from './container/NotFound';
import Practice from './container/Practice';
import BusinessHome from './container/BusinessHome';
import AddTest from './container/AddTest';

export default () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/question" component={Question} />
          <Route exact path="/practice" component={Practice} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/business" component={BusinessHome} />
          <Route exact path="/test" component={AddTest} />
          <Route exact path="/signup/user" component={RegisterUser} />
          <Route exact path="/signup/business" component={RegisterBusiness} />
          <Route exact path="/*" component={NotFound}/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};