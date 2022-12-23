import axiosConfig from "./axios.service";

const CARD = "/card";

class CardService {
  createCard = async (card: any) => {
    return await axiosConfig.post(`${CARD}`, card);
  };

  getCardById = async (cardId: string) => {
    return await axiosConfig.get(`${CARD}/${cardId}`);
  };

  updateCard = async (cardId: string, card: any) => {
    return await axiosConfig.put(`${CARD}/${cardId}`, card);
  };

  deleteCard = async (cardId: string) => {
    return await axiosConfig.delete(`${CARD}/${cardId}`);
  };
}

export default new CardService();
