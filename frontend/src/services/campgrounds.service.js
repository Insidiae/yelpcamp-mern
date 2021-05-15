import http from "../utils/http-common";

class CampgroundsService {
  getAll() {
    return http.get("/campgrounds");
  }

  get(id) {
    return http.get(`/campgrounds/${id}`);
  }

  create(data) {
    return http.post("/campgrounds", data);
  }

  edit(id, data) {
    return http.put(`/campgrounds/${id}`, data);
  }

  delete(id) {
    return http.delete(`/campgrounds/${id}`);
  }
}

export default new CampgroundsService();
