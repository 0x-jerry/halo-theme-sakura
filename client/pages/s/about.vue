<template>
  <div class="halo-theme sakura">
    <site-header :user="userInfo" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <site-footer class="mt-10" :user="userInfo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['site']),
  },
})
</script>

<style scoped>
.posts {
  max-width: 880px;
}
</style>
