import axiosConfig from "./axios.service";

const SETTING = "/setting";

class SettingService {
  async getColorSet(): Promise<any> {
    return await axiosConfig.get(`${SETTING}/colors`);
  }
}

export default new SettingService();
