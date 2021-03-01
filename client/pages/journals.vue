<template>
  <div class="post-content">
    <site-header
      :user="user"
      :menus="menus"
    />

    <div class="thumb overflow-hidden relative a-fadeIn-bottom">
      <random-image
        class="absolute top-0 left-0 object-cover w-full h-full"
        :random-id="$route.path"
      />
    </div>

    <div class="w-content a-fadeIn-top">
      <p class="test" />
    </div>

    <site-footer
      class="mt-10"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../store'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.state.user),
      menus: computed(() => store.state.menus)
    }
  }
})
</script>

<style scoped>
.title:before,
.title:after {
  font-weight: 700;

  @apply text-blue-500;
}

.title:before {
  content: '{';
}

.title:after {
  content: '}';
}

.thumb {
  height: 400px;
}
</style>
