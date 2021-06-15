import React, { Component } from "react";

class Analysis extends Component {
  render() {
    const title = <h2>Analysis</h2>;

    return (
      <div className="container pt-appnav">
        {title}
        <h5>Expenses per category</h5>
        <h5>Expenses per month</h5>
        <h5>Expenses by location</h5>
      </div>
    );
  }
}

export default Analysis;
