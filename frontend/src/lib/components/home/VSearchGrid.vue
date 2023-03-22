<template>
  <section aria-labelledby="search-label">
    <VTypography id="search-label" variant="l-title" class="visually-hidden">
      Search for meals
    </VTypography>
    <div class="search-container">
      <label for="search-input" class="visually-hidden">Search meals</label>
      <input
        id="search-input"
        v-model="searchTerm.query"
        type="text"
        class="search-input"
        placeholder="Search meals"
        @keydown.enter="executeSearch"
      />
      <button aria-label="Execute search" @click="executeSearch">
        Search
      </button>
      <button aria-label="Open advanced search modal" @click="toggleModal">
        Advanced Search
      </button>
    </div>
    <VAdvancedSearchModal
      :show-modal="showModal"
      :handle-close="handleClose"
      :search-term="searchTerm"
      @search-submitted="handleAdvancedSearch"
    />
    <VTypography
      v-if="searchTerm.query && !initialSearch && !isLoading && !error && !data?.length"
      role="alert"
    >
      No results found.
    </VTypography>
    <VTypography v-else-if="!initialSearch && isLoading" role="alert">
      Loading...
    </VTypography>
    <VTypography v-else-if="!initialSearch && error" role="alert">
      An error occurred. Please try again.
    </VTypography>
  <VMealGrid v-else-if="data" v-show="!initialSearch" class="meal-grid" :data="data"/>
</section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VMealGrid from "../shared/VMealGrid.vue";
import VTypography from "../shared/VTypography.vue";
import VAdvancedSearchModal from "./VAdvancedSearchModal.vue";
import { useSearchMeals } from "../../hooks/useSearchMeals";
import { SearchMeals } from "@/lib/types";

const searchTerm = ref<SearchMeals>({
  query: "",
});
const initialSearch = ref(true);

const { data, isLoading, refetch, error } = useSearchMeals(searchTerm);

const executeSearch = () => {
  initialSearch.value = false;
  if (searchTerm.value) {
    refetch();
  }
};

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const handleClose = () => {
  showModal.value = false;
};

const handleAdvancedSearch = (newSearchTerm: SearchMeals) => {
  searchTerm.value = newSearchTerm;
  executeSearch();
  handleClose();
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables';

.search-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.search-input {
  flex-grow: 1;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid $abn-gray-dark;
  border-radius: 2px;
  
  &:focus {
    outline: none;
    border-color: $abn-primary-green;
  }
  @media (min-width: 640px) {
    max-width:300px;
  }
}


.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
