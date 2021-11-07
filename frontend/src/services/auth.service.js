import http from "../utils/http-common";

class AuthService {
  register(data) {
    return http.post("/register", data);
  }

  login(data) {
    return http.post("/login", data);
  }

  logout() {
    return http.post("/logout");
  }
}

export default new AuthService();
