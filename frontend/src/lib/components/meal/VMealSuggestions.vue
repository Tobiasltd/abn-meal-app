<template>
  <section v-if="data" >
  <VTypography variant="l-title">Suggestions in this category</VTypography>
  <VMealGrid :data="data"/>
  </section>
</template>
<script setup lang="ts">
import { useFetchSuggestions } from "@/lib/hooks/useFetchSuggestions";
import VMealGrid from "../shared/VMealGrid.vue";
import VTypography from "../shared/VTypography.vue";
const props = defineProps<{
  category: string
}>();

const {data} = useFetchSuggestions(props.category);

</script>

<style lang="scss" scoped>
</style>
