<script setup lang="ts">
import { reactive, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BoardService from "@/services/board.service";
import CreateBoard from "@/components/project/board/CreateBoard.vue";
import CreateTable from "@/components/project/table/CreateTable.vue";

const router = useRouter();

const payget = reactive<any>({
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

const isOpenInside = computed(() => {
  return router.currentRoute.value.path.includes("board");
});

const goToBoard = (boardId: string) => {
  const path = `/project/${projectId}/board/${boardId}`;
  return path;
};
</script>

<template>
  <section class="bg-white dark:bg-gray-700 rounded-2xl w-full">
    <div class="grid grid-cols-2 gap-10" v-if="!isOpenInside">
      <div class="bg-green-50 rounded-xl flex flex-col items-center p-5">
        <div class="flex justify-around mb-10">
          <router-link
            :to="goToBoard(board._id)"
            v-for="board in payget.boards"
            :key="board._id"
            >{{ board.name }}</router-link
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
