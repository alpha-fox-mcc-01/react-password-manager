import React from "react";
import { Provider } from "react-redux";
import "./config/firebase";
import store from "./store/";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./views/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
