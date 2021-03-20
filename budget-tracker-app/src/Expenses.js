import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader";

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
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let post = { ...this.state.post };
    post[name] = value;
    this.setState({ post });
    console.log(this.state.post[name]);
  }

  handleChangeCat(event) {
    const target = event.target;
    const value = target.value;
    let post = { ...this.state.post };
    post.category.id = value;
    this.setState({ post });
    console.log(this.state.post.category);
  }

  handleDateChange(date) {
    let post = { ...this.state.post };
    post.expenseDate = date;
    this.setState({ post });
    let asd = JSON.stringify(this.state.post);
    console.log(asd);
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
    const title = <h2>Expenses</h2>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    let categoriesList = categories.map((cat) => (
      <option value={cat.id} key={cat.id}>
        {cat.name}
      </option>
    ));

    let expensesList = expenses.map((exp) => (
      <tr key={exp.id}>
        <td>
          <Moment date={exp.expenseDate} format="YYYY/MM/DD" />
        </td>
        <td>{exp.description}</td>
        <td>{exp.location}</td>
        <td>{exp.category.name}</td>
        <td>{exp.price}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.remove(exp.id)}
            title="Delete expense"
          >
            x
          </button>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add expense
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div class="modal-body">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Title"
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
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Location"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      id="price"
                      placeholder="6.9"
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
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add expense
        </button>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 10 + "%" }}>
                Date
              </th>
              <th scope="col">Description</th>
              <th scope="col" style={{ width: 15 + "%" }}>
                Location
              </th>
              <th scope="col" style={{ width: 15 + "%" }}>
                Category
              </th>
              <th scope="col" style={{ width: 15 + "%" }}>
                Price
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
