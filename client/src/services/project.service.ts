import axiosConfig from "./axios.service";

const PROJECT = "/project";

class ProjectService {
  async getProjects(sort: string, filter: string, limit: number): Promise<any> {
    return await axiosConfig.get(
      `${PROJECT}?sort=${sort}&filter=${filter}&limit=${limit}`
    );
  }

  async getProjectById(id: string): Promise<any> {
    return await axiosConfig.get(`${PROJECT}/getProjectById/${id}`);
  }

  async createProject(data: any): Promise<any> {
    return await axiosConfig.post(`${PROJECT}`, data);
  }

  async updateProject(id: string, data: any): Promise<any> {
    return await axiosConfig.put(`${PROJECT}/${id}`, data);
  }

  async deleteProject(id: string): Promise<any> {
    return await axiosConfig.delete(`${PROJECT}/deleteProject/${id}`);
  }
}

export default new ProjectService();
