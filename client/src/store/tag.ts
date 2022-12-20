import { defineStore, acceptHMRUpdate } from "pinia";
import SettingService from "../services/setting.service.ts";

type IResponseTag = {
  _id: string;
  name: string;
};

type ITags = {
  tags: Array<IResponseTag>;
};

const useTagStore = defineStore({
  id: "tag",
  state: (): ITags => ({
    tags: [],
  }),

  actions: {
    async getTags() {
      if (this.tags.length > 0) return;
      const { data } = await SettingService.getTagSet();
      this.$patch({ tags: data });
    },
  },

  getters: {
    getAllTags: (state) => state,
    getMatchedTag: (state) => (tagId: string) => {
      console.log("tagId", tagId);
      return state.tags.find((tag) => tag._id === tagId)?.name;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}

export default useTagStore;
