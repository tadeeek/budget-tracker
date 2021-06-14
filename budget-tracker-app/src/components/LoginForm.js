import React from "react";
import { useState } from "react";
import AuthorizationService from "../services/AuthorizationService";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUser = (event) => {
    event.preventDefault();
    AuthorizationService.authenticateUser(username, password).then(
      () => {
        props.isLoggedIn(true);
      },
      (error) => {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setUsername("");
        setPassword("");
      }
    );
    setErrorMessage("");
  };

  return (
    <React.Fragment>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <div className="home-signin text-center">
        <form>
          <label htmlFor="inputUserName" className="visually-hidden">
            User
          </label>
          <input
            type="text"
            id="inputUserName"
            className="form-control"
            placeholder="User"
            required=""
            autofocus=""
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="inputPassword" className="visually-hidden">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-danger text-bold">{errorMessage}</span>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={validateUser}
          >
            Sign in
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
