import http from "../utils/http-common";

class CampgroundsService {
  getAll() {
    return http.get(`/campgrounds`);
  }

  get(id) {
    return http.get(`/campgrounds/${id}`);
  }
}

export default new CampgroundsService();
