import React, { Component } from "react";
import Loader from "./Loader";

class Category extends Component {
  examplePost = {
    id: "",
    name: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Categories: [],
      post: this.examplePost,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let post = { ...this.state.post };
    post[name] = value;
    this.setState({ post });
  }

  async handleSubmit(event) {
    const post = this.state.post;
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    event.preventDefault();
    this.props.history.push("/categories");
  }

  async remove(id) {
    await fetch("/api/categories/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  render() {
    const title = <h2>Categories</h2>;
    const { Categories, isLoading } = this.state;
    if (isLoading) return <Loader />;

    let categoriesList = Categories.map((category) => (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.remove(category.id)}
            title="Delete category"
          >
            x
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="container pt-3">
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Category name"
                      id="name"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>

                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {title}

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add category
        </button>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" style={{ width: 10 + "%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody> {categoriesList}</tbody>
        </table>
      </div>
    );
  }
}

export default Category;
