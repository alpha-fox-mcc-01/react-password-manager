import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './configs/firebase'

import Dashboard from './views/Dashboard/'
import LandingPage from './views/Landing/'
import Edit from './views/Edit/'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/dashboard'>
          <Dashboard />
        </Route>
        <Route exact path='/signup'>
          <div className=''>SIGNUP PAGE</div>
        </Route>
        <Route path='/:id'>
          <Edit />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
      </Switch>
      <br />
      <br />
      <br />
    </Router>
  )
}

export default App
