<template>
  <div class="v-nav">
    <span class="v-nav-bg" :style="style"></span>
    <button
      v-for="(name, i) in items"
      :key="i"
      :ref="(e) => (btns[i] = e)"
      class="v-nav-item"
      :class="{ active: i === active }"
      @click="switchNav(i)"
    >
      {{ name }}
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watchEffect
} from '@vue/runtime-core'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 0
    }
  },
  emits: ['change', 'update:currentStep'],
  setup(props, ctx) {
    const active = ref(props.currentStep)

    const btns = reactive<HTMLButtonElement[]>([])

    const style = reactive({
      left: '0px',
      width: '0px'
    })

    const switchNav = (idx: number) => {
      active.value = idx

      const el = btns[idx]
      if (!el) {
        return
      }

      style.left = el.offsetLeft + 'px'
      style.width = el.clientWidth + 'px'

      ctx.emit('change', idx)
      ctx.emit('update:currentStep', idx)
    }

    watchEffect(() => {
      switchNav(props.currentStep)
    })

    onMounted(() => {
      switchNav(0)
    })

    return {
      active,
      style,
      btns,
      switchNav
    }
  }
})
</script>

<style scoped lang="less">
.v-nav {
  display: inline-flex;
  position: relative;
  width: 100%;
  justify-content: center;
  // border: 1px solid;
  // @apply border-gray-500 bg-gray-50;

  @h: 40px;

  height: @h;

  &-bg {
    position: absolute;
    top: -1px;
    left: 0;
    height: @h;
    z-index: 0;
    // border: 1px solid;
    // border-width: 1px 0;

    @apply border-blue-500 bg-blue-100;

    transition: all ease 0.4s;
  }

  &-item {
    z-index: 1;
    height: @h;
    padding: 0 10px;
    transition: all ease 0.4s;
    @apply text-gray-400;

    &:focus {
      outline: none;
    }

    &.active {
      @apply text-blue-500;
    }
  }
}
</style>
