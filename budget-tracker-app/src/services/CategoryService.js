import axios from "axios";
import authorizationHeader from "./AuthorizationHeader";

const apiURL = "http://localhost:8080/api/categories/";

class CategoryService {
  getCategories() {
    return axios.get(apiURL, { headers: authorizationHeader() });
  }

  addCategory(categoryItem) {
    return axios.post(apiURL, categoryItem, { headers: authorizationHeader() });
  }

  updateCategory(categoryItem) {
    return axios.put(apiURL, categoryItem, { headers: authorizationHeader() });
  }

  deleteCategory(id) {
    return axios.delete(apiURL + id, {
      headers: authorizationHeader(),
    });
  }
}

export default new CategoryService();
