import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import { Switch, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpensesService from "../services/ExpensesService";
import CategoryService from "../services/CategoryService";

class Expenses extends Component {
  currentDate = new Date();

  initialExpenseItem = {
    id: "",
    expenseDate: this.currentDate,
    description: "",
    location: "",
    price: 0.0,
    category: {
      id: 1,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      categories: [],
      date: this.currentDate,
      expenseItem: this.initialExpenseItem,
      showModal: false,
      formMethod: "POST",
      errorOcured: false,
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
    this.getExpenses();
    this.getCategories();
  }

  async getExpenses() {
    ExpensesService.getExpenses()
      .then((response) => {
        let expenses = response.data;
        this.setState({ expenses: expenses, isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.error("FORBIDDEN", errorMessage);
          this.setState({ errorOccured: true });
        }

        this.setState({ errorMessage: error.toString(), errorOccured: true });
      });
  }

  async getCategories() {
    CategoryService.getCategories()
      .then((response) => {
        const categories = response.data;

        //Set first category as first value for form
        if (categories.length > 0) {
          this.setState((tempState) => ({
            ...tempState,
            expenseItem: {
              ...tempState.expenseItem,
              category: {
                ...tempState.expenseItem.categories,
                id: categories[0].id,
              },
            },
          }));
        }

        this.setState({ categories: categories, isLoading: false });
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.error("FORBIDDEN", errorMessage);
          this.setState({ errorOccured: true });
        }

        this.setState({ errorMessage: error.toString(), errorOccured: true });
      });
  }
  async handleSubmit(event, method) {
    event.preventDefault();
    const expenseItem = this.state.expenseItem;

    //Refactor code to avoid code duplication
    if (method === "POST") {
      ExpensesService.addExpense(expenseItem)
        .then(() => {
          this.getExpenses();
          this.hideModal();
          this.clearFieldsAndErrors();
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.message;
            const errorDetails = error.response.data.details;
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

            return Promise.reject(errorMessage);
          }
          this.setState({ errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    } else if (method === "PUT") {
      ExpensesService.updateExpense(expenseItem)
        .then(() => {
          this.getExpenses();
          this.hideModal();
          this.clearFieldsAndErrors();
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.message;
            const errorDetails = error.response.data.details;
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

            return Promise.reject(errorMessage);
          }
          this.setState({ errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    }
  }

  async remove(id) {
    ExpensesService.deleteExpense(id).then(() => {
      let updatedExpenses = [...this.state.expenses].filter(
        (exp) => exp.id !== id
      );
      this.setState({ expenses: updatedExpenses });
    });
  }

  // Utils
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

  // MAnuallyyyyy clear state and input fields
  clearFieldsAndErrors = () => {
    this.setState({
      errorMessage: "",
      errorMessageDescription: "",
      errorMessageLocation: "",
      errorMessagePrice: "",
      expenseItem: {
        id: null,
        expenseDate: this.currentDate,
        description: "",
        location: "",
        price: 0,
        category: {
          id: this.state.expenseItem.category.id,
        },
      },
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let expenseItem = { ...this.state.expenseItem };
    expenseItem[name] = value;
    this.setState({ expenseItem });
  }

  handleChangeCat(event) {
    const target = event.target;
    const value = target.value;
    let expenseItem = { ...this.state.expenseItem };
    expenseItem.category.id = value;
    this.setState({ expenseItem });
  }

  handleDateChange(date) {
    let expenseItem = { ...this.state.expenseItem };
    expenseItem.expenseDate = date;
    this.setState({ expenseItem });
  }

  passExpense(id, expDate, description, location, categoryId, price) {
    let expenseItem = { ...this.state.expenseItem };
    expenseItem.id = id;
    //convert date from server
    let utcDate = expDate;
    expenseItem.expenseDate = new Date(utcDate);
    expenseItem.description = description;
    expenseItem.category.id = categoryId;
    expenseItem.location = location;
    expenseItem.price = price;
    this.setState({ expenseItem });
  }

  render() {
    const title = <h2>Expenses</h2>;
    const { categories } = this.state;
    const { expenses, showModal, formMethod } = this.state;

    if (this.state.errorOccured)
      return (
        <Switch>
          <Redirect to="/forbidden"></Redirect>
        </Switch>
      );

    let categoriesList = categories.map((cat) => (
      <option value={cat.id} key={cat.id}>
        {cat.name}
      </option>
    ));

    let expensesTotal = expenses.reduce(function (acc, obj) {
      return acc + obj.price;
    }, 0);

    let expensesList;
    if (expenses.length > 0) {
      expensesList = expenses
        .sort(function (a, b) {
          let dateA = new Date(a.expenseDate);
          let dateB = new Date(b.expenseDate);
          return dateA - dateB;
        })
        .map((exp) => (
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
                className="btn btn-outline-danger btn-sm"
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
    } else {
      expensesList = (
        <tr>
          <td colspan="6" className="bc-custom">
            No data to display, please add expenses
          </td>
        </tr>
      );
    }

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
                      selected={this.state.expenseItem.expenseDate}
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
                      value={this.state.expenseItem.description}
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
                      value={this.state.expenseItem.location}
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
                      value={this.state.expenseItem.category.id}
                    >
                      {categoriesList}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price [EUR]{" "}
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
                      value={this.state.expenseItem.price}
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
                Price [EUR]
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
                <span className="fw-bold">
                  {(Math.round(expensesTotal * 100) / 100).toFixed(2)}
                </span>
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
