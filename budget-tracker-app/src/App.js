import React, { Component } from "react";
import Category from "./components/Category";
import Expenses from "./components/Expenses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNav from "./components/NavApp";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AppNav />
        <div className="container">
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
