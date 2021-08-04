import React, { Component } from "react";
import Account from "./components/Account";
import Category from "./components/Category";
import Expenses from "./components/Expenses";
import Analysis from "./components/Analysis";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavApp from "./components/NavApp";
import AuthorizationService from "./services/AuthorizationService";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faEdit);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorizedUser: undefined,
      isLogged: false,
    };
  }

  componentDidMount() {
    const user = AuthorizationService.getAuthorizedUser();
    if (user) {
      this.setState({
        authorizedUser: user,
        isLoggedIn: true,
      });
    }
  }

  setIsLoggedIn = (value) => {
    if (value) {
      const user = AuthorizationService.getAuthorizedUser();
      this.setState({
        authorizedUser: user,
        isLoggedIn: true,
      });
    } else {
      this.setState({
        authorizedUser: undefined,
        isLoggedIn: false,
      });
    }
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavApp
            isLoggedIn={this.setIsLoggedIn}
            isLoggedInStatus={this.state.isLoggedIn}
          />
          <Switch>
            <Route path="/" exact={true}>
              <Home
                isLoggedIn={this.setIsLoggedIn}
                isLoggedInStatus={this.state.isLoggedIn}
              />
            </Route>
            <Route
              path="/categories"
              exact={true}
              exactly
              component={Category}
            />
            <Route path="/expenses" exact={true} component={Expenses} />
            <Route path="/analysis" exact={true} component={Analysis} />
            <Route path="/account" exact={true} component={Account} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
