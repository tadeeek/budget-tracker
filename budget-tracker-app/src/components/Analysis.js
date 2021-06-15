import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import CategoryService from "../services/CategoryService";
import ExpensesService from "../services/ExpensesService";

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelsExpensesPerCat: [],
      dataSetExpensesPerCat: [],
    };
  }

  async componentDidMount() {
    this.getCategories();
    this.getExpenses();
  }

  async getCategories() {
    CategoryService.getCategories().then((response) => {
      const categories = response.data;
      //Expenses per category - convert categories into labels
      const categoriesArr = categories.map((val) => val.name);
      this.setState({ labelsExpensesPerCat: categoriesArr });
    });
  }

  async getExpenses() {
    ExpensesService.getExpenses().then((response) => {
      const expenses = response.data;
      console.log(expenses);
      //Expenses per category - summarize expenses from each category
      const expenseCategoryArr = expenses.map((val) => val.category.name);
      console.log(expenseCategoryArr);
      const expensePriceArr = expenses.map((val) => val.price);
      console.log(expensePriceArr);

      const dataSetCategoryArr = [];
      const dataSetPriceArr = [];

      for (let i = 0; i < expenseCategoryArr.length; i++) {
        if (dataSetCategoryArr.includes(expenseCategoryArr[i])) {
          //sprawdź na którym miejscu
          let index = dataSetCategoryArr.indexOf(expenseCategoryArr[i]);
          //dodaj tam numerek
          let sum = dataSetPriceArr[index] + expensePriceArr[i];
          dataSetPriceArr[index] = sum;
        } else {
          dataSetCategoryArr.push(expenseCategoryArr[i]);
          dataSetPriceArr.push(expensePriceArr[i]);
        }
      }
      this.setState({ dataSetExpensesPerCat: dataSetPriceArr });
      // //Expenses per category - summarize expenses from each category
      // const expenseLocationArr = expenses.map((val) => val.location);
      // console.log(expenseLocationArr);
      // const expensePriceArr = expenses.map((val) => val.price);
      // console.log(expensePriceArr);

      // const dataSetLocationArr = [];
      // const dataSetPriceArr = [];

      // for (let i = 0; i < expenseLocationArr.length; i++) {
      //   if (dataSetLocationArr.includes(expenseLocationArr[i])) {
      //     //sprawdź na którym miejscu
      //     let index = dataSetLocationArr.indexOf(expenseLocationArr[i]);
      //     //dodaj tam numerek
      //     let sum = dataSetPriceArr[index] + expensePriceArr[i];
      //     dataSetPriceArr[index] = sum;
      //   } else {
      //     dataSetLocationArr.push(expenseLocationArr[i]);
      //     dataSetPriceArr.push(expensePriceArr[i]);
      //   }
      // }
      // this.setState({});
    });
  }

  render() {
    const title = <h2>Analysis</h2>;
    const dataExpensesPerCat = {
      labels: this.state.labelsExpensesPerCat,
      datasets: [
        {
          label: "Total expense [EUR]",
          data: this.state.dataSetExpensesPerCat,
          backgroundColor: "#cccccc",
        },
      ],
    };

    const options = {
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
      <div className="container pt-appnav">
        {title}
        <h5>Expenses per category:</h5>
        <Bar
          id="exppercat"
          data={dataExpensesPerCat}
          options={options}
          height={125}
        />
        <h5>Expenses per month (in last year):</h5>
        <h5>Expenses by location:</h5>
      </div>
    );
  }
}
export default Analysis;
