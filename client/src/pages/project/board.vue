<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, getRandomEmoji } from "@/helpers/kanban";
import Navigation from "@/components/project/board/Navigation.vue";
import Card from "@/components/project/board/card/Card.vue";
import type { IColumn, IBoardPayload } from "@/types";
import BoardService from "@/services/board.service";
import CreateCard from "@/components/project/board/card/CreateCard.vue";
import { fixedPercent } from "@/utils/format";
import Setting from "@/components/project/board/Setting.vue";
import { onScrolToBottom } from "@/helpers/scroll";
import useTagStore from "@/store/tag";
import CardLoading from "@/components/project/board/card/CardLoading.vue";
import { kanbanTypes } from "@/shared/kanban";
import UpdateCard from "@/components/project/board/card/UpdateCard.vue";
import useCardStore from "@/store/card";

const router = useRouter();
const tagStore = useTagStore();
const cardStore = useCardStore();

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
  groups: kanbanTypes,
});

const getBoardById = async () => {
  let boardId = router.currentRoute.value.params.boardId as string;
  const { data } = await BoardService.getBoardById(boardId);
  payload._id = data.board._id;
  payload.name = data.board.name;
  payload.background = data.board.background;
  payload.isFavorite = data.board.isFavorite;
  payload.customBackground = data.board.customBackground;
  payload.groups.forEach((group: any, index: number) => {
    group.children = data.cards[index]?.childrens || [];
  });
  onScrolToBottom("#scrollBottom", "down");
};

watchEffect(() => {
  getBoardById();
  tagStore.getTags();
});

const getBackground = computed(() => {
  return payload.customBackground.length > 0
    ? `background-image: url('${payload.customBackground}')`
    : `background: ${payload.background.name}`;
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
    :style="getBackground"
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
        class="parent_column bg-white dark:bg-gray-600 dark:text-gray-300 rounded-xl h-full w-96 flex-shrink-0 shadow-lg m-5 relative"
        v-for="column in payload.groups"
        :key="column._id"
      >
        <div class="h-128 flex flex-col">
          <div
            class="cursor-move rounded-t-xl p-4 space-x-4 shadow-lg bg-primary dark:bg-purple-700 text-white flex justify-between space-x-2"
          >
            <div class="flex item-center">
              <img
                :src="kanbanTypes.find((p) => p._id === column._id)?.img"
                alt="column_icon"
                width="20"
                height="20"
              />
              <h3
                class="text-base ml-2 whitespace-nowrap mt-1"
                :style="{ 'text-shadow': '0.5px 0.5px 3px #000000' }"
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
            @drop="(e: any) => onCardDrop(e, column._id)"
          >
            <Card
              v-for="item in column.children"
              :key="item._id"
              :item="item"
              @delete-card="getBoardById"
            ></Card>
            <CardLoading v-if="getCardLengthByColumnId(column._id) <= 0" />
            <CreateCard
              :card="{ boardId: payload._id, columnId: column._id }"
              @create-card="getBoardById"
            />
          </Container>
        </div>
        <UpdateCard v-if="cardStore.isOpenCardModal" />
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

.parent_column > div:nth-child(1):hover ::-webkit-scrollbar-track {
  background: #f1f1f1;
  margin-bottom: 0.3rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: transparent;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.parent_column > div:nth-child(1):hover ::-webkit-scrollbar-thumb {
  cursor: pointer;
  background: #a855f7;
}
</style>
