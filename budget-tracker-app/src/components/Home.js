import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: "",
    password: "",
    errorMessage: "",
  };

  credentialsChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  credentialsReset = () => {
    this.setState(() => this.initialState);
  };

  validateUser = (event) => {
    event.preventDefault();
    this.authenticateUser(this.state.username, this.state.password);
    // setTimeout(() => {
    //   if ("jest zalogowany") {
    //     costam
    //   } else {
    //     this.credentialsReset();
    //     this.setState({ errorMessage: "Invalid username or password" });
    //   }
    // }, 600);
  };

  async authenticateUser(username, password) {
    const credentials = {
      username: username,
      password: password,
    };
    console.log(JSON.stringify(credentials));
    await fetch("/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        let token = data.token;
        if (!response.ok) {
          const error = data.message;
          console.log("Response is not OK....");
          return Promise.reject(error);
        }
        localStorage.setItem("jwtToken", token);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div className="home-bg min-vh-100">
        <div className="container">
          <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Welcome to Budget Tracker</h1>
            <p>
              My first simple: JAVA, Spring, React and Boostrap application.
            </p>
            <div className="home-signin text-center">
              <form>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <label for="inputUserName" class="visually-hidden">
                  User
                </label>
                <input
                  type="text"
                  id="inputUserName"
                  class="form-control"
                  placeholder="User"
                  required=""
                  autofocus=""
                  value={username}
                  name="username"
                  onChange={this.credentialsChange}
                />
                <label for="inputPassword" class="visually-hidden">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required=""
                  value={password}
                  type="password"
                  name="password"
                  onChange={this.credentialsChange}
                />
                <div class="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button
                  class="w-100 btn btn-lg btn-primary"
                  type="submit"
                  onClick={this.validateUser}
                >
                  Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">©2021</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
