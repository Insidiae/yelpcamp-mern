import http from "../utils/http-common";

class ApiService {
  getCloudinaryKeys() {
    return http.get("/api/cloudinary");
  }

  getMapboxToken() {
    return http.get("/api/mapbox");
  }
}

export default new ApiService();
