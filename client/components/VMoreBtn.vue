<template>
  <div class="v-more-btn inline-block">
    <div v-if="hasMore" class="inline-block">
      <span
        class="bg-white border border-solid border-gray-200 shadow-md rounded-full inline-block cursor-pointer"
        @click="getMore"
      >
        <span v-if="isLoading">
          <f-icon name="circle-notch" class="text-2xl px-6 py-2 animate-spin" />
        </span>
        <v-link v-else>
          <f-icon fas name="ellipsis-h" class="text-2xl px-6 py-2" />
        </v-link>
      </span>
    </div>
    <div v-else class="empty text-gray-400">
      <slot name="empty">
        {{ emptyText }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasMore: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '没有更多了',
    },
    moreAction: Function,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async getMore() {
      if (this.isLoading) {
        return
      }

      this.isLoading = true
      await this.moreAction?.()
      this.isLoading = false
    },
  },
}
</script>

<style></style>
