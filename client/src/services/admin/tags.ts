import axiosConfig from "@/services/axios";

const PREFIX = "/admin/tags";

class AdminTagsService {
  async getAllUsers(): Promise<any> {
    return await axiosConfig.get(`${PREFIX}/users`);
  }

  async getUserById(id: string): Promise<any> {
    return await axiosConfig.get(`${PREFIX}/users/${id}`);
  }
}

export default new AdminTagsService();
