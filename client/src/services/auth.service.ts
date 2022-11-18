import axiosConfig from "./axios.service";

const AUTH = "/auth";

class AuthService {
  async signup(data: any): Promise<any> {
    return await axiosConfig.post(`${AUTH}/signup`, data);
  }

  async signin(data: any): Promise<any> {
    return await axiosConfig.post(`${AUTH}/signin`, data);
  }
}

export default new AuthService();
