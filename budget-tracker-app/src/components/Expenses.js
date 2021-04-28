import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Expenses extends Component {
  currentDate = new Date();

  examplePost = {
    id: "",
    expenseDate: this.currentDate,
    description: "",
    location: "",
    price: 0.0,
    category: {
      id: 4,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      expenses: [],
      categories: [],
      date: this.currentDate,
      post: this.examplePost,
      showModal: false,
      formMethod: "PUT",
      errorMessage: "",
      errorMessageDescription: "",
      errorMessageLocation: "",
      errorMessagePrice: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.changeFormMethod = this.changeFormMethod.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  async componentDidMount() {
    const responseCat = await fetch("/api/categories");
    const bodyCat = await responseCat.json();
    this.setState({ categories: bodyCat, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();
    this.setState({ expenses: bodyExp, isLoading: false });
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
    this.setState({ showModal: false });
    var backdrop = document.getElementById("modalBackdrop");
    document.body.removeChild(backdrop);
  };

  async handleSubmit(event, method) {
    event.preventDefault();
    this.clearFieldsAndErrors();

    const post = this.state.post;
    await fetch("/api/expenses", {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = data.message;
          const errorDetails = data.details;

          for (let i = 0; i < errorDetails.length; i++) {
            console.log(errorDetails[i]);
            switch (errorDetails[i].object) {
              case "description":
                this.setState({
                  errorMessageDescription: errorDetails[i].message,
                });
                break;
              case "location":
                this.setState({
                  errorMessageLocation: errorDetails[i].message,
                });
                break;
              case "price":
                this.setState({
                  errorMessagePrice: errorDetails[i].message,
                });
                break;
              default:
            }
          }

          return Promise.reject(error);
        }
        const GETresponse = await fetch("/api/expenses");
        const body = await GETresponse.json();

        this.setState({
          expenses: body,
          isLoading: false,
        });
        this.hideModal();
        this.clearFieldsAndErrors();
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  // MAnuallyyyyy clear state and input fields
  clearFieldsAndErrors = () => {
    this.setState({
      errorMessage: "",
      errorMessageDescription: "",
      errorMessageLocation: "",
      errorMessagePrice: "",
      post: {
        id: null,
        expenseDate: this.currentDate,
        description: "",
        location: "",
        price: 0,
        category: {
          id: 4,
        },
      },
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let post = { ...this.state.post };
    post[name] = value;
    this.setState({ post });
  }

  handleChangeCat(event) {
    const target = event.target;
    const value = target.value;
    let post = { ...this.state.post };
    post.category.id = value;
    this.setState({ post });
  }

  handleDateChange(date) {
    let post = { ...this.state.post };
    post.expenseDate = date;
    this.setState({ post });
  }

  passExpense(id, expDate, description, location, categoryId, price) {
    let post = { ...this.state.post };
    post.id = id;
    //convert date from server
    let utcDate = expDate;
    post.expenseDate = new Date(utcDate);
    post.description = description;
    post.category.id = categoryId;
    post.location = location;
    post.price = price;
    this.setState({ post });
  }

  async remove(id) {
    await fetch("/api/expenses/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter(
        (exp) => exp.id !== id
      );
      this.setState({ expenses: updatedExpenses });
    });
  }

  render() {
    const title = <h2>Expenses</h2>;
    const { categories } = this.state;
    const { expenses, isLoading, showModal, formMethod } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    let categoriesList = categories.map((cat) => (
      <option value={cat.id} key={cat.id}>
        {cat.name}
      </option>
    ));

    let expensesTotal = expenses.reduce(function (acc, obj) {
      return acc + obj.price;
    }, 0);

    let expensesList = expenses.map((exp) => (
      <tr key={exp.id}>
        <td>
          <Moment date={exp.expenseDate} format="YYYY/MM/DD" />
        </td>
        <td>{exp.description}</td>
        <td>{exp.location}</td>
        <td>{exp.category.name}</td>
        <td className="table-align-right">
          {(Math.round(exp.price * 100) / 100).toFixed(2)}
        </td>
        <td className="table-align-center">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            onClick={() => this.remove(exp.id)}
            title="Delete expense"
          >
            <FontAwesomeIcon icon="times" />
          </button>{" "}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              this.changeFormMethod("PUT");
              this.passExpense(
                exp.id,
                exp.expenseDate,
                exp.description,
                exp.location,
                exp.category.id,
                exp.price
              );
              this.openModal();
            }}
            title="Edit expense"
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
          id="expenseModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={"expenseModal" + this.state.formMethod + "Label"}
                >
                  {(formMethod === "PUT" ? "Edit" : "Add") + " expense"}
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
                    <label htmlFor="expenseDate" className="form-label">
                      Date
                    </label>
                    <DatePicker
                      selected={this.state.post.expenseDate}
                      dateFormat="yyyy/MM/dd"
                      onChange={this.handleDateChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description{" "}
                      <span className="text-danger">
                        {this.state.errorMessageDescription}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.post.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location{" "}
                      <span className="text-danger">
                        {this.state.errorMessageLocation}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.post.location}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="category"
                      name="category"
                      onChange={this.handleChangeCat}
                      value={this.state.post.category.id}
                    >
                      {categoriesList}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price{" "}
                      <span className="text-danger">
                        {this.state.errorMessagePrice}
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      id="price"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.post.price}
                    />
                  </div>
                </div>
                <div class="modal-footer">
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
          onClick={() => {
            this.changeFormMethod("POST");
            this.openModal();
          }}
        >
          Add expense
        </button>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 10 + "%" }}>
                Date
              </th>
              <th scope="col" style={{ width: 30 + "%" }}>
                Description
              </th>
              <th scope="col" style={{ width: 20 + "%" }}>
                Location
              </th>
              <th scope="col" style={{ width: 15 + "%" }}>
                Category
              </th>
              <th
                scope="col"
                style={{ width: 10 + "%" }}
                className="table-align-right"
              >
                Price
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
          <tbody>{expensesList}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="table-align-right">
                <span className="fw-bold">Total:</span>
              </td>
              <td className="table-align-right">
                <span className="fw-bold">{expensesTotal}</span>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Expenses;
