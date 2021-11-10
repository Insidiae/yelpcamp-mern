import http from "../utils/http-common";

class ApiService {
  getCloudinaryKeys() {
    return http.get("/api/cloudinary");
  }
}

export default new ApiService();
