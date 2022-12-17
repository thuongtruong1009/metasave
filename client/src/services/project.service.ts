import axiosConfig from "./axios.service";

const PROJECT = "/project";

class ProjectService {
  async getProjects(
    access: string,
    limit: number,
    sort: string,
    filter: string
  ): Promise<any> {
    return await axiosConfig.get(
      `${PROJECT}?access=${access}&limit=${limit}&sort=${sort}&filter=${filter}`
    );
  }

  async getProjectById(id: string): Promise<any> {
    return await axiosConfig.get(`${PROJECT}/${id}`);
  }

  async createProject(data: any): Promise<any> {
    return await axiosConfig.post(`${PROJECT}`, data);
  }

  async updateProject(id: string, data: any): Promise<any> {
    return await axiosConfig.put(`${PROJECT}/${id}`, data);
  }

  async deleteProject(id: string): Promise<any> {
    return await axiosConfig.delete(`${PROJECT}/${id}`);
  }
}

export default new ProjectService();
