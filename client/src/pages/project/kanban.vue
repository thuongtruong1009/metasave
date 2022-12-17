<script setup lang="ts">
import { ref, computed } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, getRandomEmoji } from "@/utils/helpers";
import { customBackgrounds, fixedBackgrounds } from "@/shared/background";
import Navigation from "@/components/project/kanban/Navigation.vue";
import KanbanItem from "@/components/project/kanban/KanbanItem.vue";
import type { ICard, IColumn, IScene } from "@/interface/index";

const scene = ref<IScene>({
  type: "container",
  props: {
    orientation: "horizontal",
  },
  category: "note",
  name: "Note A",
  description: "Show all to do notes of project A",
  background: fixedBackgrounds[0],
  customBackground: customBackgrounds[4],
  children: [
    {
      id: `${1}`,
      type: "container",
      icon: "ProgressIcon",
      name: "todo",
      props: {
        orientation: "vertical",
      },
      children: [
        {
          id: `${1}${1}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "todo 1",
        },
        {
          id: `${1}${2}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "todo 2",
        },
        {
          id: `${1}${3}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "todo 3",
        },
      ],
    },
    {
      id: `${2}`,
      type: "container",
      icon: "ProgressIcon",
      name: "in-progressing",
      props: {
        orientation: "vertical",
      },
      children: [
        {
          id: `${2}${1}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "in-progressing 1",
        },
        {
          id: `${2}${2}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "in-progressing 2",
        },
        {
          id: `${2}${3}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "in-progressing 3",
        },
      ],
    },
    {
      id: `${3}`,
      type: "container",
      icon: "ProgressIcon",
      name: "done",
      props: {
        orientation: "vertical",
      },
      children: [
        {
          id: `${3}${1}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "done 1",
        },
        {
          id: `${3}${2}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "done 2",
        },
        {
          id: `${3}${3}`,
          type: "card",
          loading: false,
          icon: getRandomEmoji(),
          data: "done 3",
        },
      ],
    },
  ],
});

const getCardPayload = (columnId: string) => {
  return (index: string) => {
    return scene.value.children.filter((p: IColumn) => p.id === columnId)[0]
      .children[Number(index)];
  };
};
const getCardLengthByColumnId = (columnId: string): number =>
  scene.value.children.find((p: IColumn) => p.id === columnId).children.length;

const showProcess = computed(() => {
  const result: number =
    getCardLengthByColumnId("2") /
    (getCardLengthByColumnId("1") +
      getCardLengthByColumnId("2") +
      getCardLengthByColumnId("3"));
  return Number(result.toFixed(2)) * 100;
});

const onAddNewCard = (columnId: string) => {
  const index =
    scene.value.children.find((p: IColumn) => p.id === columnId).children
      .length + 1;
  const newCard: ICard = {
    id: `${columnId}${index}`,
    type: "draggable",
    loading: false,
    icon: getRandomEmoji(),
    data: "New Card",
  };
  scene.value.children[Number(columnId) - 1].children.unshift(newCard);
};

const onColumnDrop = (dropResult: any) => {
  const view = Object.assign({}, scene.value);
  view.children = applyDrag(view.children, dropResult);
  scene.value = view;
};
const onCardDrop = (dropResult: any, columnId: string) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    const view = Object.assign({}, scene.value);
    const column = view.children.filter((p: IColumn) => p.id === columnId)[0];
    const itemIndex = view.children.indexOf(column);
    const newColumn = Object.assign({}, column);

    if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
      dropResult.payload.loading = true;
      setTimeout(() => {
        dropResult.payload.loading = false;
      }, Math.random() * 5000 + 1000);
    }

    newColumn.children = applyDrag(newColumn.children, dropResult);
    view.children.splice(itemIndex, 1, newColumn);
    scene.value = view;
  }
};

const getBackground = computed(() => {
  if (scene.value.customBackground) {
    return `url('${scene.value.customBackground}')`;
  }
  return scene.value.background;
});

const isOpenColumnSetting = ref(false);
const openColumnSetting = () => {
  isOpenColumnSetting.value = !isOpenColumnSetting.value;
};
</script>

<template>
  <section
    class="flex flex-col w-full overflow-y-hidden bg-cover bg-center bg-no-repeat"
    :style="`background-image: ${getBackground}`"
  >
    <Navigation :description="scene.description" :progress="showProcess" />

    <Container
      class="h-full flex overflow-x-auto gap-8 p-8"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
    >
      <!-- <KanbanColumn
        v-for="column in scene.children"
        :key="column.id"
        :column="column"
        :getCardPayload="getCardPayload(column.id)"
        :drop-card="(e:any) => onCardDrop(e, column.id)"
      />-->
      <!-- thay thế cho phần dưới -->
      <Draggable
        class="parent_column bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-gray-700 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
        v-for="column in scene.children"
        :key="column.id"
      >
        <div class="h-full flex flex-col">
          <div
            class="cursor-move rounded-t-lg p-4 space-x-4 bg-primary text-white flex justify-between space-x-2"
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
                <span>{{ column.children.length }}</span>
              </div>
              <!-- <div
                class="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-white/30 flex place-content-center font-bold"
                @click="onAddNewCard(column.id)"
              >
                <span>+</span>
              </div> -->
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
            :get-child-payload="getCardPayload(column.id)"
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
            @drop="(e:any) => onCardDrop(e, column.id)"
          >
            <KanbanItem
              v-for="item in column.children"
              :key="item.id"
              :item="item"
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
