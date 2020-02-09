import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/firebase';

import store from './store';
import Dashboard from './views/Dashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
