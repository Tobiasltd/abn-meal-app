<template>
  <div class="image-container">
    <img class="image" :src="strMealThumb" :alt="`Image of ${strMeal}`" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  strMealThumb: string;
  strMeal: string;
}>();
</script>

<style lang="scss" scoped>
.image-container {
  @media (min-width: 640px) {
    width: 50%;
  }
}

.image {
  width: 100%;
  margin: 2rem auto;
  @media (min-width: 640px) {
    margin: 0;
  }
}
</style>
