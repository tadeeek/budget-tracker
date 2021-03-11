import React, { Component } from "react";
import Category from "./Category";
import Expenses from "./Expenses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import AppNav from "./NavApp";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AppNav />
        <div class="container">
          <Router>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/categories" exact={true} component={Category} />
              <Route path="/expenses" exact={true} component={Expenses} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
