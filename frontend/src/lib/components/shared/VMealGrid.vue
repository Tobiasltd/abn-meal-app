<template>
  <div class="meal-grid" role="list">
    <VMealCard
      v-for="meal in data"
      :key="meal.idMeal"
      :str-meal="meal.strMeal"
      :str-meal-thumb="meal.strMealThumb"
      :id-meal="meal.idMeal"
    />
  </div>
</template>

<script setup lang="ts">
import { Meal, MealDetails } from "@/lib/types";
import VMealCard from "./VMealCard.vue";
defineProps<{
  data: MealDetails[] | Meal[] | undefined;
}>();
</script>

<style lang="scss" scoped>
.meal-grid {
  padding: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content:center;
}
</style>
