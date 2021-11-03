import http from "../utils/http-common";

class ReviewsService {
  create(campgroundId, data) {
    return http.post(`/campgrounds/${campgroundId}/reviews`, data);
  }

  delete(campgroundId, reviewId) {
    return http.delete(`/campgrounds/${campgroundId}/reviews/${reviewId}`);
  }
}

export default new ReviewsService();
