import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Character from './Pages/Character';
import Detail from './Pages/Detail';
import MainPage from './Pages/Main';
import Order from './Pages/Main/MyPage/Cart/Order';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/index" component={MainPage} />
          <Route exact path="/character/:id" component={Character} />
          <Route exact path="/products/:id" component={Detail} />
          <Route exact path="/order" component={Order} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
