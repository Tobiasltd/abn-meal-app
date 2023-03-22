<template>
    <section aria-labelledby="highlighted-label">
      <VTypography
        id="highlighted-label"
        variant="l-title"
        role="heading"
        aria-level="2"
      >
        Highlighted
      </VTypography>
      <div class="card-container">
        <VMealCard
          v-if="!isLoading && !isError && data"
          :key="data.idMeal"
          :str-meal="data.strMeal"
          :str-meal-thumb="data.strMealThumb"
          :id-meal="data.idMeal"
        />
      </div>
      <VTypography v-if="isLoading" role="alert">Loading...</VTypography>
      <VTypography v-if="isError" role="alert">Error: {{ error }}</VTypography>
    </section>
</template>


<script lang="ts" setup>
import VTypography from "@/lib/components/shared/VTypography.vue";
import VMealCard from "@/lib/components/shared/VMealCard.vue";
import { useRandomMeal } from "@/lib/hooks/useRandomMeal";

const { data, isLoading, isError, error } = useRandomMeal();

</script>

<style scoped>
.card-container { 
 max-width:300px;
 margin: 2rem auto;
}
</style>

