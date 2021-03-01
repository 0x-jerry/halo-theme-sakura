<template>
  <div class="timeline p-5">
    <ul
      v-for="(node, i) in nodes"
      :key="i"
      class="big-node pl-2"
    >
      <div class="relative flex items-center node-title">
        <f-icon
          name="archive"
          class="big-node-icon node-icon"
        />
        <span class="node-text text-xl">
          {{ node.title }}
        </span>
      </div>
      <div class="sub py-4">
        <li
          v-for="(o, idx) in node.nodes"
          :key="idx"
          class="sub-node node-icon my-4"
        >
          <div class="relative flex items-center node-title">
            <f-icon
              name="dot-circle"
              class="sub-node-icon"
            />
            <div class="node-text w-full">
              <slot :node="o">
                {{ o.title }}
              </slot>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface IPropNode<T extends { title: string } = { title: string }> {
  title: string
  nodes: T[]
}

export default defineComponent({
  props: {
    nodes: {
      type: Array as PropType<IPropNode[]>,
      default: () => []
    }
  }
})
</script>

<style scoped>
.big-node {
  @apply border-l border-solid border-gray-300;
  @apply pb-2;
}

.big-node-icon {
  @apply text-3xl bg-white;
  @apply relative;

  left: -23px;
}

.sub-node {
}

.sub-node-icon {
  @apply text-xl  bg-white;
  @apply relative;
  left: -19px;
}

.node-icon {
  @apply text-blue-400;
}

.node-text {
  @apply text-gray-500;
}

.node-title:hover .node-icon {
  @apply text-blue-500;
}

.node-title:hover .node-text {
  @apply text-gray-600;
}
</style>
