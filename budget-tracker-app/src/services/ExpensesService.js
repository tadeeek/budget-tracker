import axios from "axios";
import authorizationHeader from "./AuthorizationHeader";

const apiURL = "http://localhost:8080/api/expenses/";

class ExpensesService {
  getExpenses() {
    return axios.get(apiURL, { headers: authorizationHeader() });
  }

  addExpense(expenseItem) {
    return axios.post(apiURL, expenseItem, { headers: authorizationHeader() });
  }

  updateExpense(expenseItem) {
    return axios.put(apiURL, expenseItem, { headers: authorizationHeader() });
  }

  deleteExpense(id) {
    return axios.delete(apiURL + id, {
      headers: authorizationHeader(),
    });
  }
}

export default new ExpensesService();
