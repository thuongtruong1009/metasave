import axiosConfig from "./axios.service";

const CARD = "/card";

class CardService {
  createCard = async (card: any) => {
    return await axiosConfig.post(`${CARD}`, card);
  };

  deleteCard = async (id: string) => {
    return await axiosConfig.delete(`${CARD}/${id}`);
  };
}

export default new CardService();
