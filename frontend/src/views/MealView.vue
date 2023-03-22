<template>
  <div class="content">
    <VTypography v-if="isLoading" role="alert">Loading...</VTypography>
    <VTypography v-else-if="error" role="alert">An error occurred. Please try again.</VTypography>
    <div v-else>
      <div v-if="data">
        <header>
          <router-link to="/" class="back-to-home">Back to homepage</router-link>
          <VTypography variant="xl-title">{{ data.strMeal }}</VTypography>
        </header>
        <main>
          <section class="overview-container">
            <VMealImage :str-meal-thumb="data.strMealThumb" :str-meal="data.strMeal"/>
            <VIngredientList :meal-data="data"/>
          </section>
          <section>
            <VTypography variant="l-title">Instructions</VTypography>
            <VTypography>{{ data.strInstructions }}</VTypography>
          </section>
          <section v-if="data.strYoutube">
            <VTypography variant="l-title">Video</VTypography>
            <VMealVideo :str-youtube="data.strYoutube"/>
          </section>
        </main>
        <footer>
          <VMealSuggestions v-if="data.strCategory" :category="data.strCategory"/>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import { useSearchMealById } from "@/lib/hooks/useSearchMealById";
import VMealSuggestions from "@/lib/components/meal/VMealSuggestions.vue";
import VTypography from "@/lib/components/shared/VTypography.vue";
import VMealVideo from "@/lib/components/meal/VMealVideo.vue";
import VIngredientList from "@/lib/components/meal/VIngredientList.vue";
import VMealImage from "@/lib/components/meal/VMealImage.vue";


const route = useRoute();

const mealId = ref<string>(route.params.id as string ?? "");

const { data, isLoading, error } = useSearchMealById(mealId);

// Watch for changes in route.params.id
watch(
  () => route.params.id,
  (newId) => {
  mealId.value = newId as string;
  }
);

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables';
.content {
  max-width: 1100px;
  margin: 0 auto;
}


.overview-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.back-to-home {
  display: inline-block;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
