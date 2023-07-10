import axiosConfig from "@/services/axios";

const PREFIX = "/admin";

class AdminColorsService {
  async getColors(): Promise<any> {
    return await axiosConfig.get(`${PREFIX}/colors`);
  }

  async updateColorById(id: string, payload: any): Promise<any> {
    return await axiosConfig.put(`${PREFIX}/colors/${id}`, payload);
  }
}

export default new AdminColorsService();
