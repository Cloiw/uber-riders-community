import React from 'react';
import Home from '../Home';
import Report from '../Report';
import CreatePin from '../../components/CreatePin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (

  <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/showpins"
          render={(props) => <Home {...props} pins="true" />}
        />
        <Route
          exact
          path="/report/new/:lat/:long"
          render={(props) => <CreatePin {...props} />}
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