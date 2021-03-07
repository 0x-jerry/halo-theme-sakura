<template>
  <div class="v-steps">
    <div class="v-steps-nav">
      <v-nav
        v-model:current-step="active"
        :items="steps"
        @change="switchStep"
      ></v-nav>
    </div>
    <div class="v-steps-content">
      <div
        v-for="(_, i) in steps"
        :key="i"
        class="v-step"
        :class="{ active: active === i }"
      >
        <slot :name="`step-${i}`">
          Slot [step-{{ i }}] Not Defined!
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    steps: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:currentStep'],
  setup(props, ctx) {
    const active = ref(props.currentStep)

    const switchStep = (stepIdx: number) => {
      active.value = stepIdx
      ctx.emit('update:currentStep', stepIdx)
    }

    watchEffect(() => {
      switchStep(props.currentStep)
    })

    return {
      active,
      switchStep
    }
  }
})
</script>

<style lang="less">
.v-steps {
  &-content {
    padding: 10px;
  }
}

.v-step {
  display: none;

  &.active {
    display: block;
  }
}
</style>
