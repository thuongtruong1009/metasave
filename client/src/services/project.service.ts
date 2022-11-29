import axiosConfig from "./axios.service";

const PROJECT = "/project";

class ProjectService {
  async getProjects(): Promise<any> {
    return await axiosConfig.get(`${PROJECT}`);
  }

  async getProjectById(id: string): Promise<any> {
    return await axiosConfig.get(`${PROJECT}/getProjectById/${id}`);
  }

  async createProject(data: any): Promise<any> {
    return await axiosConfig.post(`${PROJECT}/createProject`, data);
  }

  async updateProject(id: string, data: any): Promise<any> {
    return await axiosConfig.put(`${PROJECT}/updateProject/${id}`, data);
  }

  async deleteProject(id: string): Promise<any> {
    return await axiosConfig.delete(`${PROJECT}/deleteProject/${id}`);
  }
}

export default new ProjectService();
