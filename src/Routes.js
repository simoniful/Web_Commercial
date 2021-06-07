import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import New from './Pages/New';
import Hot from './Pages/Hot';
import My from './Pages/My';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/New" component={New} />
          <Route exact path="/Hot" component={Hot} />
          <Route exact path="/My" component={My} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
