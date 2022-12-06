import axiosConfig from "./axios.service";

class EventService {
  getAllEvents() {
    return axiosConfig.get("/event");
  }

  getEventById(id: string) {
    return axiosConfig.get(`/event/${id}`);
  }

  createEvent(data: any) {
    return axiosConfig.post("/event", data);
  }

  updateEvent(id: string, event: any) {
    return axiosConfig.put(`/event/${id}`, event);
  }

  deleteEvent(id: string) {
    return axiosConfig.delete(`/event/${id}`);
  }
}

export default new EventService();
