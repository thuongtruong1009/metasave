<script setup lang="ts">
import { reactive, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BoardService from "@/services/board.service";
import CreateBoard from "@/components/project/board/CreateBoard.vue";
import CreateTable from "@/components/project/table/CreateTable.vue";

const router = useRouter();

const payget = reactive({
  boards: [],
  tables: [],
});

const projectId = router.currentRoute.value.params.projectId as string;

const getAllBoards = async () => {
  const { data } = await BoardService.getAllBoards(projectId);
  payget.boards = data;
};

watchEffect(async () => {
  getAllBoards();
});

// {"props":{"orientation":"horizontal"},"_id":"639934a400daa0b3ec71a528","owner":{"_id":"638e20cf7cc65d797b25f52b","username":"user01"},"type":"container","name":"Project của Thịnh","access":"private","description":"Trùm OS","categoryId":"2","members":[],"isFavorite":false,"background":"#ffffff","customBackground":"","boards":[],"startDate":"2022-12-14T02:22:48.970Z","endDate":"2022-12-14T02:22:48.970Z","createdAt":"2022-12-14T02:27:48.989Z","updatedAt":"2022-12-17T07:04:14.218Z","__v":0}

const isOpenInside = computed(() => {
  return router.currentRoute.value.path.includes("board");
});

const goToBoard = (boardId: string) => {
  const path = `/project/${projectId}/board/${boardId}`;
  return path;
};
</script>

<template>
  <section class="p-5 bg-white dark:bg-gray-700 rounded-2xl w-full">
    <div class="grid grid-cols-2 gap-10" v-if="!isOpenInside">
      <div class="bg-green-50 rounded-xl flex flex-col items-center p-5">
        <div class="flex justify-around mb-10">
          <router-link
            :to="goToBoard(board._id)"
            v-for="board in payget.boards"
            :key="board._id"
            >Board {{ board.name }}</router-link
          >
        </div>
        <CreateBoard @create-board="getAllBoards" />
      </div>
      <div class="bg-pink-50 rounded-xl flex flex-col items-center p-5">
        <div class="flex justify-around mb-10">
          <router-link
            :to="goToBoard(table._id)"
            v-for="table in payget.tables"
            :key="table._id"
            >Table {{ table.name }}</router-link
          >
        </div>
        <CreateTable @create-table="getAllBoards" />
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>
