import axiosConfig from "./axios.service";

const EVENT = "/event";

class EventService {
  getAllEvents(present: string, startDate: string, endDate: string) {
    return axiosConfig.get(
      `${EVENT}?present=${present}&start=${startDate}&end=${endDate}`
    );
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
