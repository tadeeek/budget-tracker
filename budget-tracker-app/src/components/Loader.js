import React, { Component } from "react";
class Loader extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Loader;
