import axios from "axios";

const API_URL = "https://trello-alpha-backend-dev.herokuapp.com/rest/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  register(username, password, name, lastName) {
    return axios.post(API_URL + "signup", {
      username,
      password,
      name,
      lastName
    });
  }

  logout() {
    localStorage.removeItem("user");
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();