import React, { Component } from "react";
import Loader from "./Loader";

class Category extends Component {
  state = {
    isLoading: true,
    Categories: [],
  };

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }

  render() {
    const { Categories, isLoading } = this.state;
    if (isLoading) return <Loader />;

    return (
      <React.Fragment>
        <h2>Categories</h2>
        {Categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))}
      </React.Fragment>
    );
  }
}

export default Category;
