import { defineStore, acceptHMRUpdate } from "pinia";
import CardService from "@/services/card.service";

type IResponseCard = {
  _id: string;
  status: number;
  icon: string;
  text: string;
  tagId: string;
  createdAt: string;
  updatedAt: string;
};

const useCardStore = defineStore({
  id: "card",
  state: (): IResponseCard => ({
    _id: "",
    status: 0,
    icon: "",
    text: "",
    tagId: "",
    createdAt: "",
    updatedAt: "",
  }),

  getters: {
    getCardStore: (state) => state,

    isOpenCardModal: (state) => state._id !== "",
  },

  actions: {
    resetState() {
      this.$reset();
    },

    async getCardById(id: string) {
      const { data } = await CardService.getCardById(id);
      this.$patch({ ...data });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCardStore, import.meta.hot));
}

export default useCardStore;
