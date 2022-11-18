import http from "../http-common";

class ClaimDataService {
  getAll() {
    return http.get("/claim");
  }

  get(id) {
    return http.get(`/claim/${id}`);
  }

  create(data) {
    return http.post("/claim", data);
  }

  update(id, data) {
    return http.put(`/claim/${id}`, data);
  }

  delete(id) {
    return http.delete(`/claim/${id}`);
  }

  deleteAll() {
    return http.delete(`/claim`);
  }

  findByDescription(description) {
    return http.get(`/claim?title=${description}`);
  }
}

export default new ClaimDataService();