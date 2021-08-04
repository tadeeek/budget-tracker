import axios from "axios";
import authorizationHeader from "./AuthorizationHeader";

const apiURL = "http://localhost:8080/api/user/";

class UserService {
  getUserDetails() {
    return axios.get(apiURL, { headers: authorizationHeader() });
  }
}

export default new UserService();
