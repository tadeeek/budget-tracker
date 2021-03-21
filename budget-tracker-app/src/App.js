import React, { Component } from "react";
import Category from "./components/Category";
import Expenses from "./components/Expenses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNav from "./components/NavApp";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faEdit);

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AppNav />

        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/categories" exact={true} component={Category} />
            <Route path="/expenses" exact={true} component={Expenses} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
