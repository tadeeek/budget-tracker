import axios from "axios";

class RegisterService {
  async registerUser(userName, name, email, password) {
    await axios.post("http://localhost:8080/registration", {
      userName,
      name,
      email,
      password,
    });
  }
  //   getAuthorizedUser() {
  //     return JSON.parse(localStorage.getItem("dataToken"));
  //   }

  //   logout() {
  //     localStorage.removeItem("dataToken");
  //   }
}

export default new RegisterService();
