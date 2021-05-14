import http from "../utils/http-common";

class CampgroundsService {
  getAll() {
    return http.get(`/campgrounds`);
  }
}

export default new CampgroundsService();
