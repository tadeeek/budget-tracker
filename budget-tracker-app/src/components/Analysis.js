import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import CategoryService from "../services/CategoryService";
import ExpensesService from "../services/ExpensesService";
import "rainbowvis.js";

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelsExpensesPerCat: [],
      dataSetExpensesPerCat: [],
      labelsExpensesByLocation: [],
      dataSetExpensesByLocation: [],
      dataSetTransactionsByLocation: [],
      gradientRainbow: [],
    };
  }

  async componentDidMount() {
    this.getCategories();
    this.getExpenses();
  }

  async getCategories() {
    CategoryService.getCategories().then((response) => {
      const categories = response.data;
      this.convertCategoriesIntoLabels(categories);
    });
  }

  convertCategoriesIntoLabels(categories) {
    const categoriesArr = categories.map((val) => val.name);
    this.setState({ labelsExpensesPerCat: categoriesArr });
  }

  async getExpenses() {
    ExpensesService.getExpenses().then((response) => {
      const expenses = response.data;
      console.log(expenses);
      this.sumExpensesFromEachCategory(expenses);
      this.sumExpensesFromEachLocation(expenses);
      this.sumNoTransactionsFromEachLocation(expenses);

      this.setState({
        gradientRainbow: this.generateRainbow(
          this.state.labelsExpensesByLocation.length
        ),
      });
    });
  }

  sumExpensesFromEachCategory(expenses, name) {
    this.name = name;
    const expenseCategoryArr = expenses.map((val) => val.category.name);
    const expensePriceArr = expenses.map((val) => val.price);

    const dataSetCategoryArr = [];
    const dataSetPriceArr = [];

    for (let i = 0; i < expenseCategoryArr.length; i++) {
      if (dataSetCategoryArr.includes(expenseCategoryArr[i])) {
        let index = dataSetCategoryArr.indexOf(expenseCategoryArr[i]);
        let sum = dataSetPriceArr[index] + expensePriceArr[i];
        dataSetPriceArr[index] = sum;
      } else {
        dataSetCategoryArr.push(expenseCategoryArr[i]);
        dataSetPriceArr.push(expensePriceArr[i]);
      }
    }

    this.setState({ dataSetExpensesPerCat: dataSetPriceArr });
  }

  sumExpensesFromEachLocation(expenses) {
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

    this.setState({ labelsExpensesByLocation: dataSetLocationArr });
    this.setState({ dataSetExpensesByLocation: dataSetPriceArr });
  }

  sumNoTransactionsFromEachLocation(expenses) {
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
    console.log(dataSetLocationArr);
    console.log(dataSetTransactionsArr);
    this.setState({ dataSetTransactionsByLocation: dataSetTransactionsArr });
  }

  //Gradient rainbow generator
  generateRainbow(items) {
    var Rainbow = require("rainbowvis.js");
    var numberOfItems = items;
    var rainbow = new Rainbow();
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum("#483d7b", "#56dad1");
    var backgroundColorArr = [];
    for (var i = 1; i <= numberOfItems; i++) {
      var hexColour = rainbow.colourAt(i);
      backgroundColorArr.push("#" + hexColour);
    }
    return backgroundColorArr;
  }

  render() {
    const title = <h2>Analysis</h2>;
    console.log(this.state.labelsExpensesByLocation.length);
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

    const optionsExpensesByLocation = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    const optionsExpensesPerCat = {
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return (
      <div className="container pt-appnav pb-5">
        {title}
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
            <h5 className="pt-5 text-center">
              Expenses per month (this year):
            </h5>
          </div>
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
        </div>
      </div>
    );
  }
}
export default Analysis;
