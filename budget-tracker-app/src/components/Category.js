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
      <div className="container pt-3">
        <h2>Categories</h2>
        {Categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))}
      </div>
    );
  }
}

export default Category;
