<template>
  <ul class="ingredient-list">
    <VTypography class="ingredients-title" variant="l-title">Ingredients</VTypography>
    <li v-for="(item, index) in pairedIngredients" :key="`ingredient-${index}`">
      {{ item.ingredient }} - {{ item.measure }}
    </li>
  </ul>
</template>



<script lang="ts" setup>
import { computed } from "vue";
import VTypography from "@/lib/components/shared/VTypography.vue";
import { MealDetails } from "@/lib/types";

const props = defineProps<{
  mealData: MealDetails;
}>();

/**
 * Returns an array of objects, each containing an ingredient and its corresponding measure.
 * This computed property pairs ingredients and measures by iterating through the strIngredient
 * and strMeasure properties in the mealData prop.
 */
const pairedIngredients = computed(() => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDetails;
    const measureKey = `strMeasure${i}` as keyof MealDetails;

    const ingredient = props.mealData[ingredientKey];
    const measure = props.mealData[measureKey];

    if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }
  return ingredients;
});
</script>



<style lang="scss" scoped>
.ingredients-title {
  margin-top: 0;
}
.ingredient-list {
  padding: 0;
  margin: 0;
  text-align: left;
  @media (min-width: 640px) {
    flex-direction: row;
    width: 50%;
  }
}

</style>
