<script setup lang="ts">
defineProps<{
  total: string;
}>();
</script>

<template>
  <div class="overview_component flex">
    <div>
      <h3>0</h3>
      <p>In Progress</p>
    </div>
    <div>
      <h3>0</h3>
      <p>Up Comming</p>
    </div>
    <div>
      <h3>{{ total ? total : 0 }}</h3>
      <p>Total Projects</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview_component {
  h3 {
    font-weight: 600;
    font-size: 1.5rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: 400;
  }
  div {
    padding: 1rem;
  }
}
</style>
