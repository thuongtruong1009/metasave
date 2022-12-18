<script setup lang="ts">
import { ref, reactive, watchEffect, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, getRandomEmoji } from "@/helpers/kanban";
import { customBackgrounds, fixedBackgrounds } from "@/shared/background";
import Navigation from "@/components/project/board/Navigation.vue";
import KanbanItem from "@/components/project/board/KanbanItem.vue";
import type { ICard, IColumn, IBoardPayload } from "@/types";
import BoardService from "@/services/board.service";
import CardService from "@/services/card.service";

const router = useRouter();

let payload = reactive<IBoardPayload>({
  _id: "",
  type: "container",
  props: {
    orientation: "horizontal",
  },
  name: "",
  description: "",
  isFavorite: false,
  background: {
    _id: "",
    name: "",
  },
  customBackground: customBackgrounds[4],
  createdAt: "",
  updatedAt: "",
  groups: [
    {
      _id: 1,
      icon: "TodoIcon",
      name: "todo",
      children: [],
    },
    {
      _id: 2,
      icon: "ProgressIcon",
      name: "progressing",
      children: [],
    },
    {
      _id: 3,
      icon: "DoneIcon",
      name: "done",
      children: [],
    },
  ],
});

const boardId = router.currentRoute.value.params.boardId as string;
const getBoardById = async () => {
  const { data } = await BoardService.getBoardById(boardId);
  payload._id = data.board._id;
  payload.name = data.board.name;
  payload.description = data.board.description;
  payload.background = data.board.background;
  payload.isFavorite = data.board.isFavorite;
  payload.customBackground = data.board.customBackground;
  payload.createdAt = data.board.createdAt;
  payload.updatedAt = data.board.updatedAt;
  payload.groups.forEach((group: any, index: number) => {
    group._id = data.cards[index]?._id;
    group.children = data.cards[index]?.childrens || [];
    group.props = {
      orientation: "vertical",
    };
    group.type = "container";
  });
};

watchEffect(() => {
  getBoardById();
});

const getBackground = computed(() => {
  if (payload.customBackground?.length !== 0) {
    return `url('${payload.customBackground}')`;
  }
  return payload.background.name;
});

const isOpenColumnSetting = ref(false);
const openColumnSetting = () => {
  isOpenColumnSetting.value = !isOpenColumnSetting.value;
};

const getCardLengthByColumnId = (columnId: number): number => {
  let result = payload.groups?.find((p: IColumn) => p._id === columnId)
    ?.children.length;
  return result;
};

const showProcess = computed(() => {
  const result: number =
    getCardLengthByColumnId(3) /
    (getCardLengthByColumnId(1) +
      getCardLengthByColumnId(2) +
      getCardLengthByColumnId(3));

  const format = result;
  return format === 0 ? 0 : format;
});

const onAddNewCard = async (status: number) => {
  console.log("status", status);
  const newCard: ICard = {
    boardId: payload._id,
    text: "Card new(nhap)",
    status: status,
    icon: getRandomEmoji(),
  };

  await CardService.createCard(newCard);
  getBoardById();
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
      }, Math.random() * 1000);
    }

    newColumn.children = applyDrag(newColumn.children, dropResult);

    payload.groups.splice(itemIndex, 1, newColumn);
  }
};

const getCardPayload = (columnId: number) => {
  return (index: number) => {
    return payload.groups.filter((p: IColumn) => p._id === columnId)[0]
      .children[index];
  };
};
</script>

<template>
  <section
    class="flex flex-col w-full overflow-y-hidden bg-cover bg-center bg-no-repeat rounded-xl p-5 shadow-md dark:bg-gray-700"
    :class="`bg-[${getBackground}]`"
  >
    <Navigation :description="payload.description" :progress="showProcess" />

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
              <h3 class="text-base ml-2 whitespace-nowrap mt-1">
                {{ column.name }}
              </h3>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 p-1 rounded-full bg-white/30 flex place-content-center"
              >
                <span>{{ getCardLengthByColumnId(column._id) }}</span>
              </div>
              <div
                class="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-white/30 flex place-content-center font-bold"
                @click="onAddNewCard(column._id)"
              >
                <span>+</span>
              </div>
              <div
                class="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-white/30 flex place-content-center font-bold relative"
                @click="openColumnSetting"
              >
                <span>⋮</span>
                <div class="absolute z-10 top-10 right-0 w-40">
                  <Transition name="fade">
                    <ul
                      v-if="isOpenColumnSetting"
                      class="bg-white text-gray-600 rounded-lg shadow-lg p-2 text-left"
                    >
                      <li>Edit column</li>
                      <li>Copy column link</li>
                      <li>Delete column</li>
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
          <Container
            class="flex-grow overflow-y-auto overflow-x-hidden"
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
            @drop="(e:any) => onCardDrop(e, column._id)"
          >
            <KanbanItem
              v-for="item in column.children"
              :key="item._id"
              :item="item"
              @delete-card="getBoardById"
            ></KanbanItem>
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
