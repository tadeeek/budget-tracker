import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";

class Expenses extends Component {
  emptyItem = {
    id: "",
    expensedate: new Date(),
    description: "",
    location: "",
    category: {
      id: 4,
      name: "Other",
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      expenses: [],
      categories: [],
      date: new Date(),
      post: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async handleSubmit(event) {
    const post = this.state.post;
    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    event.preventDefault();
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target; /* select */
    const value = target.value; /* liczba */
    const name = target.name; /* category */
    console.log(name);
    let post = { ...this.state.post };

    console.log("huj");
    post[name] = value;
    this.setState({ post });
    console.log(this.state.post);
  }

  handleChangeCat(event) {
    const target = event.target; /* select */
    const value = target.value; /* liczba */
    const name = target.name; /* category */
    console.log(name);
    let post = { ...this.state.post };

    console.log("huj");
    post.category.id = value;
    this.setState({ post });
    console.log(this.state.post);
  }

  handleDateChange(date) {
    let post = { ...this.state.post };
    post.expensedate = date;
    this.setState({ post });
    console.log(this.state.post);
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

  async componentDidMount() {
    const responseCat = await fetch("/api/categories");
    const bodyCat = await responseCat.json();
    this.setState({ categories: bodyCat, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();
    this.setState({ expenses: bodyExp, isLoading: false });
  }

  render() {
    const title = <h2>Add Expense</h2>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return (
        <React.Fragment>
          <h2>Loading...</h2>
        </React.Fragment>
      );
    }

    let categoriesList = categories.map((cat) => (
      <option value={cat.id} key={cat.id}>
        {cat.name}
      </option>
    ));

    let expensesList = expenses.map((exp) => (
      <tr key={exp.id}>
        <td>{exp.id}</td>
        <td>{exp.description}</td>
        <td>{exp.location}</td>
        <td>
          <Moment date={exp.expenseDate} format="YYYY/MM/DD" />
        </td>
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

    return (
      <React.Fragment>
        {title}
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              onChange={this.handleChange}
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
            >
              {categoriesList}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="expensedate" className="form-label">
              Date
            </label>
            <DatePicker
              selected={this.state.post.expensedate}
              onChange={this.handleDateChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
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
            <button className="btn btn-primary">Submit</button>{" "}
            <button className="btn btn-secondary" href="/categories">
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
