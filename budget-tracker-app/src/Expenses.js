import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: true,
      expenses: [],
      categories: [],
      post: this.postData,
    };
  }

  handleChange;

  // {
  //   "id": 100,
  //   "expenseDate": "2019-06-16T17:00:00Z",
  //   "description": "Visiting Rome",
  //   "location": "Las Vegas",
  //   "category": {
  //       "id": 1,
  //       "name": "Transport"
  //   }
  // }

  postData = {
    id: "101",
    expenseDate: new Date(),
    description: "Dinner",
    location: "Las Vegas",
    category: [1, "Travel"],
  };

  async componentDidMount() {
    const responseCat = await fetch("/api/categories");
    const bodyCat = await responseCat.json();
    this.setState({ categories: bodyCat, isLoading: false });
  }

  async componentDidMount() {
    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();
    this.setState({ expenses: bodyExp, isLoading: false });
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
    const title = <h2>Add Expense</h2>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    let categoriesList = categories.map((cat) => (
      <option value={cat.id}>{cat.name}</option>
    ));

    let expensesList = expenses.map((exp) => (
      <tr value={exp.id}>
        <td>{exp.id}</td>
        <td>{exp.description}</td>
        <td>{exp.location}</td>
        <td>{exp.expenseDate}</td>
        <td>{exp.category.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.remove(exp.id)}
          >
            DELETE
          </button>
        </td>
      </tr>
    ));

    if (isLoading) {
      return (
        <React.Fragment>
          <h2>Loading...</h2>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {title}
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="title" className="form-label">
              Category
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={this.handleChange}
            >
              {categoriesList}
            </select>
          </div>
          <div className="mb-3">
            <label for="expensedate" className="form-label">
              Date
            </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            <button
              type="submit"
              class="btn btn-secondary"
              tag={Link}
              to="/categories"
            >
              Cancel
            </button>
          </div>
        </form>
        <h2 className="mt-5">Expenses</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ width: 5 + "%" }}>
                #
              </th>
              <th scope="col" style={{ width: 30 + "%" }}>
                Description
              </th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col" style={{ width: 15 + "%" }}>
                Category
              </th>
              <th scope="col" style={{ width: 10 + "%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{expensesList}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Expenses;
