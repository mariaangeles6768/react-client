import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/cars");
  }

  get(id) {
    return http.get(`/cars/${id}`);
  }

  create(data) {
    return http.post("/cars", data);
  }

  update(id, data) {
    return http.put(`/cars/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cars/${id}`);
  }

  deleteAll() {
    return http.delete(`/car`);
  }

  findByTitle(title) {
    return http.get(`/cars?title=${title}`);
  }
}

export default new TutorialDataService();