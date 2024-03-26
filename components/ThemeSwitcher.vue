<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const btnIcon = computed(() =>
  isDark.value ? "i-heroicons-moon" : "i-heroicons-sun"
);

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <UButton @click="toggleTheme" :icon="btnIcon"> </UButton>
</template>

<style lang="less" scoped></style>
