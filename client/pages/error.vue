<template>
  <div class="text-center p-20 mt-20">
    <h1 class="pt-20 text-3xl">
      500
    </h1>
    <p class="p-10 my-5 shadow">
      {{ errorMsg }}
    </p>
    <router-link to="/">
      {{ $t('home') }}
    </router-link>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const errorMsg = ref('')

    onMounted(() => {
      errorMsg.value =
        window.__INITIAL_STATE__?.storeState?.error || 'Unknown Error'
    })

    return {
      errorMsg
    }
  }
})
</script>
