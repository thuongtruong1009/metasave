import axiosConfig from "./axios.service";

const SETTING = "/setting";

class SettingService {
  getColorSet = async (): Promise<any> => {
    return await axiosConfig.get(`${SETTING}/colors`);
  };

  getTagSet = async () => {
    return await axiosConfig.get(`${SETTING}/tags`);
  };
}

export default new SettingService();
