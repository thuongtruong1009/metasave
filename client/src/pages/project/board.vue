<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, getRandomEmoji } from "@/helpers/kanban";
import Navigation from "@/components/project/board/Navigation.vue";
import KanbanItem from "@/components/project/board/KanbanItem.vue";
import type { IColumn, IBoardPayload } from "@/types";
import BoardService from "@/services/board.service";
import CreateCard from "@/components/project/board/CreateCard.vue";
import { fixedPercent } from "@/utils/format";
import Setting from "@/components/project/board/Setting.vue";
import { onScrolToBottom } from "@/helpers/scroll";
import useTagStore from "@/store/tag";

const router = useRouter();
const tagStore = useTagStore();

let payload = reactive<IBoardPayload>({
  _id: "",
  type: "container",
  props: {
    orientation: "horizontal",
  },
  name: "",
  isFavorite: false,
  background: {
    _id: "",
    name: "",
  },
  customBackground: "",
  groups: [
    {
      _id: 1,
      icon: "TodoIcon",
      name: "Todo",
    },
    {
      _id: 2,
      icon: "ProgressIcon",
      name: "Progressing",
    },
    {
      _id: 3,
      icon: "DoneIcon",
      name: "Done",
    },
  ],
});

const boardId = router.currentRoute.value.params.boardId as string;
const getBoardById = async () => {
  const { data } = await BoardService.getBoardById(boardId);
  payload._id = data.board._id;
  payload.name = data.board.name;
  payload.background = data.board.background;
  payload.isFavorite = data.board.isFavorite;
  payload.customBackground = data.board.customBackground;
  payload.groups.forEach((group: any, index: number) => {
    group.children = data.cards[index]?.childrens || [];
    group.props = {
      orientation: "vertical",
    };
    group.type = "container";
  });
};

onMounted(() => {
  getBoardById();
  tagStore.getTags();
});

const getBackground = computed(() => {
  if (payload.customBackground?.length !== 0) {
    return `url('${payload.customBackground}')`;
  }
  return payload.background.name;
});

const getCardLengthByColumnId = (columnId: number): number => {
  let result = payload.groups?.find((p: IColumn) => p._id === columnId)
    ?.children?.length;
  return result ? result : 0;
};

const showProcess = computed<number>(() =>
  fixedPercent(
    getCardLengthByColumnId(3) /
      (getCardLengthByColumnId(1) +
        getCardLengthByColumnId(2) +
        getCardLengthByColumnId(3))
  )
);

const getCardPayload = (columnId: number) => {
  return (index: number) => {
    return payload.groups.filter((p: IColumn) => p._id === columnId)[0]
      .children[index];
  };
};

const onColumnDrop = (dropResult: any) => {
  const view = Object.assign({}, payload);
  payload.groups = applyDrag(view.groups, dropResult);
};

const onCardDrop = (dropResult: any, columnId: number) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    const view = Object.assign({}, payload);
    const column = view.groups.filter((p: IColumn) => p._id === columnId)[0];
    const itemIndex = view.groups.indexOf(column);
    const newColumn = Object.assign({}, column);

    if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
      dropResult.payload.loading = true;
      setTimeout(() => {
        dropResult.payload.loading = false;
      }, 1000);
    }

    newColumn.children = applyDrag(newColumn.children, dropResult);

    payload.groups.splice(itemIndex, 1, newColumn);
  }
};
</script>

<template>
  <section
    class="flex flex-col w-full overflow-y-hidden bg-cover bg-center bg-no-repeat rounded-xl p-5 shadow-md dark:bg-gray-700"
    :class="`bg-[${getBackground}]`"
  >
    <Navigation :progress="showProcess" :isFavorite="payload.isFavorite" />

    <Container
      class="h-full flex justify-between flex-wrap overflow-x-auto"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
    >
      <Draggable
        class="parent_column bg-white dark:bg-gray-600 dark:text-gray-300 rounded-xl h-full w-96 flex-shrink-0 shadow-lg m-5"
        v-for="column in payload.groups"
        :key="column._id"
      >
        <div class="h-128 flex flex-col">
          <div
            class="cursor-move rounded-t-xl p-4 space-x-4 bg-primary dark:bg-purple-700 text-white flex justify-between space-x-2"
          >
            <div class="flex item-center">
              <img
                :src="`/src/assets/img/${column.icon}.svg`"
                alt="column_icon"
                width="20"
                height="20"
              />
              <h3
                class="text-base ml-2 whitespace-nowrap mt-1"
                :style="{ 'text-shadow': '0.5px 0.5px 3px #000000' }"
                @click="onScrolToBottom('#scrollBottom', 'down')"
              >
                {{ column.name }}
              </h3>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 p-1 rounded-full bg-white/30 flex place-content-center"
              >
                <span>{{ getCardLengthByColumnId(column._id) }}</span>
              </div>
              <Setting />
            </div>
          </div>
          <Container
            class="flex-grow overflow-y-auto overflow-x-hidden"
            id="scrollBottom"
            orientation="vertical"
            group-name="col-items"
            :shouldAcceptDrop="
              (e:any, payload:any) => e.groupName === 'col-items' && !payload.loading
            "
            :get-child-payload="getCardPayload(column._id)"
            :drop-placeholder="{
              className: `bg-primary bg-opacity-20  
            border-dotted border-2 
            border-primary rounded-lg mx-4 my-2`,
              animationDuration: '200',
              showOnTop: true,
            }"
            drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
            drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
            @drop="(e) => onCardDrop(e, column._id)"
          >
            <KanbanItem
              v-for="item in column.children"
              :key="item._id"
              :item="item"
              @delete-card="getBoardById"
            ></KanbanItem>
            <CreateCard
              :card="{ boardId: payload._id, columnId: column._id }"
              @create-card="getBoardById"
            />
          </Container>
        </div>
      </Draggable>
    </Container>
  </section>
</template>

<style scoped>
.smooth-dnd-container.horizontal {
  display: flex !important;
}

::-webkit-scrollbar {
  width: 7px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

.parent_column:hover ::-webkit-scrollbar-thumb {
  cursor: pointer;
  background: #a855f7;
}
</style>