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
          <VButton class="text-xl">Take me Home</VButton>
        </NuxtLink>
      </div>
    </HeroImage>
  </div>
</template>
