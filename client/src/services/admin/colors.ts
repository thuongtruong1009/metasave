import axiosConfig from "@/services/axios";

const PREFIX = "/admin";

class AdminColorsService {
  async createColor(payload: any): Promise<any> {
    return await axiosConfig.post(`${PREFIX}/colors`, payload);
  }

  async getColors(): Promise<any> {
    return await axiosConfig.get(`${PREFIX}/colors`);
  }

  async updateColorById(id: string, payload: any): Promise<any> {
    return await axiosConfig.put(`${PREFIX}/colors/${id}`, payload);
  }

  async deleteColorById(id: string): Promise<any> {
    return await axiosConfig.delete(`${PREFIX}/colors/${id}`);
  }
}

export default new AdminColorsService();
