import React from 'react';
import Home from '../Home';
import Report from '../Report';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (

  <Router  basename="/uber-riders-community/">
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/report/:reportsId"
          render={(props) => <Report {...props} />}
        />
      </Switch>
  </Router>
)

export default App;
