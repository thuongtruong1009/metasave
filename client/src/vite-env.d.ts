/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "@heroicons/*";

declare module "vue3-smooth-dnd";

declare module "*.d.ts";
