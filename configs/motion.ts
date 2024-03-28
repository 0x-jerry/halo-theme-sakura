import type { MotionVariants } from "@vueuse/motion";
import { kebabCase, mapKeys } from "lodash-es";

const directives: Record<string, MotionVariants<never>> = {
  popBottom: {
    initial: {
      opacity: 0,
      translateY: '-40px'
    },
    enter: {
      opacity: 1,
      translateY: '0px'
    },
  },
};

export const motionRuntimeConfig = {
  directives: mapKeys(directives, (_, key) => kebabCase(key)),
};
