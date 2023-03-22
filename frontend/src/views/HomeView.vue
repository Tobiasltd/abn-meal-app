<template>
  <header>
    <VTypography variant="xl-title" role="heading" aria-level="1">
      Find your unique meal
    </VTypography>
    <VTypography>
      Discover new and exciting recipes from around the world.
    </VTypography>
  </header>
  <main>
    <VSearchGrid />
  </main>
  <footer>
    <VRandomMeal/>
  </footer>
</template>

<script lang="ts" setup>
import VTypography from "@/lib/components/shared/VTypography.vue";
import VRandomMeal from "@/lib/components/home/VRandomMeal.vue";
import VSearchGrid from "@/lib/components/home/VSearchGrid.vue";
</script>

<style scoped>
</style>

