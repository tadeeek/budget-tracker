import axios from "axios";

class AuthorizationService {
  async authenticateUser(username, password) {
    await axios
      .post("http://localhost:8080/authenticate", { username, password })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("dataToken", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  getAuthorizedUser() {
    return JSON.parse(localStorage.getItem("dataToken"));
  }

  logout() {
    localStorage.removeItem("dataToken");
  }
}

export default new AuthorizationService();
