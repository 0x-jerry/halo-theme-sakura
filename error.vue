<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <HeroImage title="Unknown Area!" :description="error?.message">
      <div class="flex items-center justify-center mt-4">
        <NuxtLink to="/">
          <UButton color="violet" size="xl">Take me home</UButton>
        </NuxtLink>
      </div>
    </HeroImage>
  </div>
</template>
