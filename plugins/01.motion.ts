import { MotionPlugin } from "@vueuse/motion";
import { motionRuntimeConfig } from "~/configs/motion";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionPlugin, motionRuntimeConfig);
});
