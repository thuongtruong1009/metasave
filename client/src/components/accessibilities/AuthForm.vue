<script setup lang="ts">
const props = defineProps<{
  title: string;
  username: string;
  password: string;
}>();

const emits = defineEmits(["login"]);

const onSubmit = () => {
  emits("login", props);
};
</script>

<template>
  <div class="px-6 py-12 sm:py-20 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <img class="mx-auto h-10 w-auto" src="/logo.png" alt="logo" />
      <h2
        class="text-3xl mt-8 mb-4 font-bold tracking-tight text-gray-900 sm:text-4xl capitalize"
      >
        {{ title }}
      </h2>
      <p class="text-base leading-8 text-gray-600">
        Schedule management platform for individuals and teams
      </p>
    </div>

    <form
      action="#"
      method="POST"
      class="mx-auto mt-16 max-w-xl sm:mt-20 grid grid-cols-1 gap-x-8 gap-y-6"
    >
      <div>
        <label
          for="company"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Username or Email</label
        >
        <div class="mt-2.5">
          <input
            type="email"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            required
            autocomplete="email"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold leading-6 text-gray-900"
          >Password</label
        >
        <input
          type="password"
          v-model="props.password"
          required
          autocomplete="email"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
        />
      </div>
      <button
        type="submit"
        class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 capitalize"
      >
        {{ title }}
      </button>
    </form>
  </div>
</template>
