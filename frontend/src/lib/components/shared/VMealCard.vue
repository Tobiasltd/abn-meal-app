<template>
  <article  v-if="strMeal && strMealThumb && idMeal" class="card">
    <img :src="strMealThumb" alt="Meal thumbnail" class="meal-image" />
    <VTypography variant="l-title" class="title">
      {{ strMeal }}
    </VTypography>
    <router-link :to="{ name: 'meal', params: { id: idMeal } }" class="button" aria-label="View meal details">
      View Meal
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import VTypography from '@/lib/components/shared/VTypography.vue';
import { Meal } from '@/lib/types';

const props = defineProps<{
  strMeal: Meal['strMeal'];
  strMealThumb: Meal['strMealThumb'];
  idMeal: Meal['idMeal'];
}>()

const { strMeal, strMealThumb, idMeal } = toRefs(props);
</script>

<style scoped>
.card {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.79);
  overflow: hidden;
  background-color: white;
  padding-bottom: 2rem;
}

.meal-image {
  width: 100%;
  display: block;
}

.title {
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem 0;
  font-weight: bold;
  color: var(--abn-primary);
}

.button {
  margin: auto 2rem 1rem 2rem;
}
</style>
