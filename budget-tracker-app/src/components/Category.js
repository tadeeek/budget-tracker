import React, { Component } from "react";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Category extends Component {
  exampleCategoryItem = {
    id: "",
    name: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Categories: [],
      categoryItem: this.exampleCategoryItem,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPUT = this.handleSubmitPUT.bind(this);
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
    let categoryItem = { ...this.state.categoryItem };
    categoryItem[name] = value;
    this.setState({ categoryItem });
    console.log({ categoryItem });
  }

  async handleSubmit(event) {
    const categoryItem = this.state.categoryItem;
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryItem),
    });
    event.preventDefault();
    this.props.history.push("/categories");
  }

  passCategory(id, name) {
    let categoryItem = { ...this.state.categoryItem };
    categoryItem.id = id;
    categoryItem.name = name;
    this.setState({ categoryItem });
  }

  async handleSubmitPUT(event) {
    console.log("inSubmitPut");
    const categoryItem = this.state.categoryItem;
    await fetch("/api/categories/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryItem),
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
    }).then(() => {
      let updatedCategories = [...this.state.Categories].filter(
        (cat) => cat.id !== id
      );
      this.setState({ Categories: updatedCategories });
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
            class="btn btn-outline-danger btn-sm"
            onClick={() => this.remove(category.id)}
            title="Delete category"
          >
            <FontAwesomeIcon icon="times" />
          </button>{" "}
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            onClick={() => this.passCategory(category.id, category.name)}
            title="Edit category"
          >
            <FontAwesomeIcon icon="edit" />
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="container pt-appnav">
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

        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">
                  Edit category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={this.handleSubmitPUT}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder={this.state.categoryItem.name}
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
