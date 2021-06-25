import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import CategoryService from "../services/CategoryService";
import ExpensesService from "../services/ExpensesService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "rainbowvis.js";

class Analysis extends Component {
  currentDate = new Date();

  constructor(props) {
    super(props);

    this.state = {
      startDate: this.currentDate,
      endDate: null,
      expenses: [],
      labelsExpensesPerCat: [],
      dataSetExpensesPerCat: [],
      labelsExpensesByLocation: [],
      dataSetExpensesByLocation: [],
      dataSetTransactionsByLocation: [],
      gradientRainbow: [],
      rangeErrorMessage: "",
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  async componentDidMount() {
    this.getCategories();
    this.getExpenses();
  }

  async getCategories() {
    CategoryService.getCategories().then((response) => {
      const categories = response.data;
      //Getting ALL categories for labels
      this.convertCategoriesIntoLabels(categories);
    });
  }
  //API
  async getExpenses() {
    ExpensesService.getExpenses().then((response) => {
      let expenses = response.data;
      console.log(expenses);
      expenses = this.sortExpensesByDate(expenses);
      this.setState({ expenses: expenses });
      this.resetRange(expenses);
      this.generateCharts(this.state.expenses);
    });
  }

  resetRange(expenses) {
    this.setState({
      startDate: new Date(expenses[0].expenseDate),
      endDate: new Date(expenses[expenses.length - 1].expenseDate),
    });
  }

  generateCharts(expenses) {
    this.generateExpensesPerCategoryChart(expenses);
    this.generateExpensesByLocationChart(expenses);
    this.generateNoTransactionsInLocationChart(expenses);
  }

  // handleDateChange(dates) {
  //   const [startDate, endDate] = dates;
  //   this.setState({ startDate: startDate });
  //   this.setState({ endDate: endDate });

  //   let expenses = this.filterExpensesByDate(
  //     this.state.expenses,
  //     this.state.startDate,
  //     this.state.endDate
  //   );
  //   if (expenses.length <= 0) {
  //     this.setState({
  //       rangeErrorMessage:
  //         "No data to display, please select new date range. Displaying charts for previous date range...",
  //     });
  //   } else {
  //     this.generateCharts(expenses);
  //     this.setState({
  //       rangeErrorMessage: "",
  //     });
  //   }
  // }

  // handleEndDateChange(endDate) {
  //   this.setState({ endDate: endDate }, () => {
  //     console.log("Data state w callback" + this.state.endDate);
  //   });
  //   let expenses = this.filterExpensesByDate(
  //     this.state.expenses,
  //     this.state.startDate,
  //     this.state.endDate
  //   );
  //   this.generateCharts(expenses);
  // }

  handleStartDateChange(startDate) {
    this.setState({ startDate: startDate }, () => {
      let expenses = this.filterExpensesByDate(
        this.state.expenses,
        startDate,
        this.state.endDate
      );

      if (expenses.length <= 0) {
        this.setState({
          rangeErrorMessage:
            "No data to display, please select new date range.",
        });
        this.resetRange(this.state.expenses);
        this.generateCharts(this.state.expenses);
      } else {
        this.generateCharts(expenses);
        this.setState({
          rangeErrorMessage: "",
        });
      }
    });
  }

  handleEndDateChange(endDate) {
    this.setState({ endDate: endDate }, () => {
      let expenses = this.filterExpensesByDate(
        this.state.expenses,
        this.state.startDate,
        endDate
      );

      if (expenses.length <= 0) {
        this.setState(
          {
            rangeErrorMessage:
              "No data to display, please select new date range.",
          },
          () => {
            this.resetRange(this.state.expenses);
            this.generateCharts(this.state.expenses);
          }
        );
      } else {
        this.generateCharts(expenses);
        this.setState({
          rangeErrorMessage: "",
        });
      }
    });
  }

  filterExpensesByDate(expenses, startDate, endDate) {
    console.log(startDate);
    console.log(endDate);
    return expenses.filter((exp) => {
      let date = new Date(exp.expenseDate).getTime();
      return date >= startDate && date <= endDate;
    });
  }

  sortExpensesByDate(expenses) {
    let newExpenses = expenses.sort(function (a, b) {
      let dateA = new Date(a.expenseDate);
      let dateB = new Date(b.expenseDate);
      return dateA - dateB;
    });
    return newExpenses;
  }

  //Generating data for charts
  convertCategoriesIntoLabels(categories) {
    const categoriesArr = categories.map((val) => val.name);
    console.log(categoriesArr);
    this.setState({ labelsExpensesPerCat: categoriesArr });
  }

  generateExpensesPerCategoryChart(expenses) {
    const expenseCategoryArr = expenses.map((val) => val.category.name);
    const expensePriceArr = expenses.map((val) => val.price);

    const dataSetPriceArr = new Array(
      this.state.labelsExpensesPerCat.length
    ).fill(0);
    for (let i = 0; i < expenses.length; i++) {
      if (this.state.labelsExpensesPerCat.includes(expenseCategoryArr[i])) {
        let index = this.state.labelsExpensesPerCat.indexOf(
          expenseCategoryArr[i]
        );
        let sum = dataSetPriceArr[index] + expensePriceArr[i];
        dataSetPriceArr[index] = sum;
      }
    }

    // for (let i = 0; i < expenseCategoryArr.length; i++) {
    //   if (dataSetCategoryArr.includes(expenseCategoryArr[i])) {
    //     let index = dataSetCategoryArr.indexOf(expenseCategoryArr[i]);
    //     let sum = dataSetPriceArr[index] + expensePriceArr[i];
    //     dataSetPriceArr[index] = sum;
    //   } else {
    //     dataSetCategoryArr.push(expenseCategoryArr[i]);
    //     dataSetPriceArr.push(expensePriceArr[i]);
    //   }
    // }
    // this.setState({ labelsExpensesPerCat: dataSetCategoryArr });
    this.setState({ dataSetExpensesPerCat: dataSetPriceArr });
  }

  generateExpensesByLocationChart(expenses) {
    const expenseLocationArr = expenses.map((val) => val.location);
    const expensePriceArr = expenses.map((val) => val.price);
    const dataSetLocationArr = [];
    const dataSetPriceArr = [];
    for (let i = 0; i < expenseLocationArr.length; i++) {
      if (dataSetLocationArr.includes(expenseLocationArr[i])) {
        let index = dataSetLocationArr.indexOf(expenseLocationArr[i]);
        let sum = dataSetPriceArr[index] + expensePriceArr[i];
        dataSetPriceArr[index] = sum;
      } else {
        dataSetLocationArr.push(expenseLocationArr[i]);
        dataSetPriceArr.push(expensePriceArr[i]);
      }
    }

    this.setState({ labelsExpensesByLocation: dataSetLocationArr }, () => {
      //generate rainbow here
      // Dont let one item destroy ranbow, set constant color for one displayed item
      if (dataSetLocationArr.length <= 1) {
        this.setState({
          gradientRainbow: "#483d7b",
        });
      } else {
        this.setState({
          gradientRainbow: this.generateRainbow(dataSetLocationArr.length),
        });
      }
    });
    this.setState({ dataSetExpensesByLocation: dataSetPriceArr });
  }

  generateNoTransactionsInLocationChart(expenses) {
    const expenseLocationArr = expenses.map((val) => val.location);

    const dataSetLocationArr = [];
    const dataSetTransactionsArr = [];
    for (let i = 0; i < expenseLocationArr.length; i++) {
      if (dataSetLocationArr.includes(expenseLocationArr[i])) {
        let index = dataSetLocationArr.indexOf(expenseLocationArr[i]);
        let currentNoTransactions = dataSetTransactionsArr[index] + 1;
        dataSetTransactionsArr[index] = currentNoTransactions;
      } else {
        dataSetLocationArr.push(expenseLocationArr[i]);
        dataSetTransactionsArr.push(1);
      }
    }

    this.setState({ dataSetTransactionsByLocation: dataSetTransactionsArr });
  }

  //Gradient rainbow generator
  generateRainbow(items) {
    var Rainbow = require("rainbowvis.js");
    var rainbow = new Rainbow();
    rainbow.setNumberRange(1, items);
    rainbow.setSpectrum("#483d7b", "#56dad1");
    var backgroundColorArr = [];
    for (var i = 1; i <= items; i++) {
      var hexColour = rainbow.colourAt(i);
      backgroundColorArr.push("#" + hexColour);
    }
    return backgroundColorArr;
  }

  render() {
    const title = <h2>Analysis</h2>;
    let rangeErrorMessage = this.state.rangeErrorMessage;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    //Data
    const dataExpensesPerCat = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(86, 218, 209, 1)");
      gradient.addColorStop(1, "rgba(72, 61, 123, 1)");

      return {
        labels: this.state.labelsExpensesPerCat,

        datasets: [
          {
            label: "Total expense [EUR]",
            data: this.state.dataSetExpensesPerCat,
            backgroundColor: gradient,
          },
        ],
      };
    };

    const dataExpensesPerMonth = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(86, 218, 209, 1)");
      gradient.addColorStop(1, "rgba(72, 61, 123, 1)");

      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],

        datasets: [
          {
            label: "Total expense [EUR]",
            data: this.state.dataSetExpensesPerCat,
            backgroundColor: gradient,
          },
        ],
      };
    };

    const dataExpensesByLocation = {
      labels: this.state.labelsExpensesByLocation,
      datasets: [
        {
          label: "Expenses by location [EUR]",
          data: this.state.dataSetExpensesByLocation,
          backgroundColor: this.state.gradientRainbow,
        },
      ],
    };
    const dataNoTransactionsByLocation = {
      labels: this.state.labelsExpensesByLocation,
      datasets: [
        {
          label: "Number of transactions by location",
          data: this.state.dataSetTransactionsByLocation,
          backgroundColor: this.state.gradientRainbow,
        },
      ],
    };
    //Charts options
    const optionsExpensesByLocation = {
      responsive: true,
    };

    const optionsExpensesPerCat = {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const optionsExpensesPerMonth = {
      responsive: true,
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    return (
      <div className="container pt-appnav pb-5">
        {title}
        <div className="text-center pb-3 ">
          <h5>Select date range:</h5>
          <div className="pt-3">
            <form>
              From:
              <DatePicker
                selected={startDate}
                onChange={this.handleStartDateChange}
                dateFormat="yyyy/MM/dd"
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              To:
              <DatePicker
                selected={endDate}
                onChange={this.handleEndDateChange}
                dateFormat="yyyy/MM/dd"
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </form>
          </div>
          <span className="text-danger fw-bold">{rangeErrorMessage}</span>
        </div>
        <div className="row">
          <h5 className="text-center">Expenses per category:</h5>
          <Bar
            data={dataExpensesPerCat}
            options={optionsExpensesPerCat}
            height={125}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <h5 className="pt-5 text-center">Expenses by location:</h5>

            <Doughnut
              data={dataExpensesByLocation}
              options={optionsExpensesByLocation}
              height={80}
            />
            <h5 className="pt-5 text-center">
              Number of transactions in location:
            </h5>
            <Doughnut
              data={dataNoTransactionsByLocation}
              options={optionsExpensesByLocation}
              height={80}
            />
          </div>
          <div className="col-md-6">
            <h5 className="pt-5 text-center">
              Expenses per month:
              <Bar
                data={dataExpensesPerMonth}
                options={optionsExpensesPerMonth}
                height={320}
              />
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
export default Analysis;
