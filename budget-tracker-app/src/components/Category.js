import React, { Component } from "react";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryService from "../services/CategoryService";

class Category extends Component {
  initialCategoryItem = {
    id: null,
    name: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categories: [],
      categoryItem: this.initialCategoryItem,
      showModal: false,
      formMethod: "PUT",
      errorMessage: "",
      errorMessageCategoryName: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeFormMethod = this.changeFormMethod.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  async componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    CategoryService.getCategories().then((response) => {
      const body = response.data;
      this.setState({ categories: body, isLoading: false });
    });
  }

  async handleSubmit(event, method) {
    event.preventDefault();
    this.clearFieldsAndErrors();
    const categoryItem = this.state.categoryItem;

    //Refactor code to avoid code duplication
    if (method === "POST") {
      CategoryService.addCategory(categoryItem)
        .then(() => {
          this.getCategories();
          this.hideModal();
          this.clearFieldsAndErrors();
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.message;
            const errorDetails = error.response.data.details;
            this.setState({
              errorMessageCategoryName: errorDetails[0].message,
            });
            this.setState({ errorMessage: errorMessage.toString() });
          }
          this.setState({ errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    } else if (method === "PUT") {
      CategoryService.updateCategory(categoryItem)
        .then(() => {
          this.getCategories();
          this.hideModal();
          this.clearFieldsAndErrors();
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.message;
            const errorDetails = error.response.data.details;
            this.setState({
              errorMessageCategoryName: errorDetails[0].message,
            });
            this.setState({ errorMessage: errorMessage.toString() });
          }
          this.setState({ errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    }
  }

  async remove(id) {
    CategoryService.deleteCategory(id).then(() => {
      let updatedCategories = [...this.state.categories].filter(
        (cat) => cat.id !== id
      );
      this.setState({ categories: updatedCategories });
    });
  }

  //Utils
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let categoryItem = { ...this.state.categoryItem };
    categoryItem[name] = value;
    this.setState({ categoryItem });
  }

  changeFormMethod(method) {
    this.setState({ formMethod: method });
  }

  openModal = () => {
    document.body.classList.add("modal-open");
    this.setState({ showModal: true });
    var backdrop = document.createElement("div");
    backdrop.setAttribute("id", "modalBackdrop");
    backdrop.classList.add("modal-backdrop", "fade", "show");
    document.body.appendChild(backdrop);
  };

  hideModal = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      showModal: false,
    });
    var backdrop = document.getElementById("modalBackdrop");
    document.body.removeChild(backdrop);
  };

  clearFieldsAndErrors = () => {
    this.setState({
      errorMessage: "",
      errorMessageCategoryName: "",
      categoryItem: {
        id: null,
        name: "",
      },
    });
  };

  passCategory(id, name) {
    let categoryItem = { ...this.state.categoryItem };
    categoryItem.id = id;
    categoryItem.name = name;
    this.setState({ categoryItem });
  }

  render() {
    const title = <h2>Categories</h2>;
    const { categories, isLoading, showModal, formMethod } = this.state;

    if (isLoading) return <Loader />;

    let categoriesList = categories.map((category) => (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td className="table-align-center">
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
            onClick={() => {
              this.changeFormMethod("PUT");
              this.passCategory(category.id, category.name);
              this.openModal();
            }}
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
          className={"modal fade " + (showModal ? "show d-block" : "d-none")}
          id="categoryModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={"categoryModal" + this.state.formMethod + "Label"}
                >
                  {(formMethod === "PUT" ? "Edit" : "Add") + " category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    this.clearFieldsAndErrors();
                    this.hideModal();
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <form
                onSubmit={(e) => this.handleSubmit(e, this.state.formMethod)}
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Name{" "}
                      <span className="text-danger">
                        {this.state.errorMessageCategoryName}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.categoryItem.name}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.clearFieldsAndErrors();
                      this.hideModal();
                    }}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {title}

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            this.changeFormMethod("POST");
            this.openModal();
          }}
        >
          Add category
        </button>

        {/* CATEGORIES TABLE*/}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 85 + "%" }}>
                Name
              </th>
              <th
                scope="col"
                style={{ width: 15 + "%" }}
                className="table-align-center"
              >
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
