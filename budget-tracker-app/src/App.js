import React, { Component } from "react";
import Category from "./components/Category";
import Expenses from "./components/Expenses";
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
      <React.Fragment>
        <NavApp
          isLoggedIn={this.setIsLoggedIn}
          isLoggedInStatus={this.state.isLoggedIn}
        />
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Home
                isLoggedIn={this.setIsLoggedIn}
                isLoggedInStatus={this.state.isLoggedIn}
              />
            </Route>
            <Route path="/categories" exact={true} component={Category} />
            <Route path="/expenses" exact={true} component={Expenses} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
