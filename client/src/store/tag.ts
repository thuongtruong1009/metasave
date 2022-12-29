import { defineStore, acceptHMRUpdate } from "pinia";
import SettingService from "../services/setting.service";

type IResponseTag = {
  _id: string;
  name: string;
  color: {
    _id: string;
    name: string;
  };
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
    getAllTagsNoDefault: (state) => {
      let clone = state.tags;
      return clone.filter((tag) => tag.name !== "");
    },
    getTagName: (state) => (tagId: string) => {
      return state.tags.find((tag) => tag._id === tagId)?.name;
    },
    getTagColor: (state) => (tagId: string) => {
      return state.tags.find((tag) => tag._id === tagId)?.color.name;
    },
    getDefaultTagId: (state): any => {
      return state.tags.find((tag) => tag.name === "")?._id;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}

export default useTagStore;
