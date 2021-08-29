import React from "react";
import { useState } from "react";
import RegisterService from "../services/RegisterService";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageUserName, setErrorMessageUserName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    RegisterService.registerUser(userName, name, email, password)
      .then(() => {
        console.log("OK");
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;

          if (error.response.data.details !== null) {
            const errorDetails = error.response.data.details;
            for (let i = 0; i < errorDetails.length; i++) {
              console.log(errorDetails[i]);
              switch (errorDetails[i].object) {
                case "password":
                  setErrorMessagePassword(errorDetails[i].message);
                  break;
                case "email":
                  setErrorMessageEmail(errorDetails[i].message);
                  break;
                case "userName":
                  setErrorMessageUserName(errorDetails[i].message);
                  break;

                default:
              }
            }
          } else {
            const errorMessage = error.response.data.message;
            setErrorMessageUserName(errorMessage);
          }

          return Promise.reject(errorMessage);
        }
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    setErrorMessage("");
  };

  return (
    <React.Fragment>
      <div className="min-vh-100">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1 className="h3 mb-3 fw-normal">Register</h1>
            <div className="home-signin">
              <form>
                <label htmlFor="inputUserName" className="m-2">
                  Username:
                </label>
                <span className="text-danger fw-bold">
                  {errorMessageUserName}
                </span>

                <input
                  type="text"
                  id="inputUserName"
                  className="form-control"
                  placeholder="Username"
                  required=""
                  autofocus=""
                  value={userName}
                  name="userName"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="inputNName" className="m-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  placeholder="Name"
                  required=""
                  autofocus=""
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="inputEmail" className="m-2">
                  E-mail:
                </label>
                <span className="text-danger fw-bold">{errorMessageEmail}</span>
                <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  placeholder="E-mail"
                  required=""
                  autofocus=""
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="inputPassword" className="m-2">
                  Password
                </label>
                <span className="text-danger fw-bold">
                  {errorMessagePassword}
                </span>

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

                <span className="text-danger fw-bold">{errorMessage}</span>

                <button
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                  onClick={registerUser}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
