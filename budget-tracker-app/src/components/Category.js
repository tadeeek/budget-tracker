import React, { Component } from "react";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Category extends Component {
  exampleCategoryItem = {
    id: null,
    name: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categories: [],
      categoryItem: this.exampleCategoryItem,
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPUT = this.handleSubmitPUT.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ categories: body, isLoading: false });
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
    event.preventDefault();
    const categoryItem = this.state.categoryItem;
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryItem),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          console.log(error);
          return Promise.reject(error);
        }
        const GETresponse = await fetch("/api/categories");
        const body = await GETresponse.json();
        this.setState({ categories: body, isLoading: false });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        console.log(error);
      });
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
    }).th;
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
      let updatedCategories = [...this.state.categories].filter(
        (cat) => cat.id !== id
      );
      this.setState({ categories: updatedCategories });
    });
  }

  render() {
    const title = <h2>Categories</h2>;
    const { categories, isLoading } = this.state;

    if (isLoading) return <Loader />;

    {
      /* POST FORM MODAL */
    }
    let categoriesList = categories.map((category) => (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.remove(category.id)}
            title="Delete category"
          >
            <FontAwesomeIcon icon="times" />
          </button>{" "}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
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
        {/* POST FORM MODAL*/}
        {/* <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
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
              </div> */}
        <form onSubmit={this.handleSubmit}>
          {/* <div className="modal-body"> */}
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
          {/* </div> */}
          {/* <div className="modal-footer"> */}
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          {/* </div> */}
        </form>
        {/* </div>
          </div>
        </div> */}
        {/* UPDATE FORM MODAL*/}
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
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

        {/* CATEGORIES TABLE*/}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 80 + "%" }}>
                Name
              </th>
              <th scope="col" style={{ width: 20 + "%" }}>
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
