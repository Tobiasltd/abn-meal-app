<template>
  <dialog v-if="showModal" class="modal-overlay" aria-labelledby="advanced-search-heading" aria-modal="true">
    <form class="modal" @submit.prevent="submitSearch">
      <h2 id="advanced-search-heading">Advanced Search</h2>
      <div class="form-group">
        <label for="search-term">Search term:</label>
        <input id="search-term" v-model="localSearchTerm.query" type="text" placeholder="Enter search term">
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input id="category" v-model="localSearchTerm.category" type="text" placeholder="Enter category">
      </div>
      <div class="form-group">
        <label for="area">Area:</label>
        <input id="area" v-model="localSearchTerm.area" type="text" placeholder="Enter area">
      </div>
      <div class="form-group">
        <label for="ingredient">Ingredient:</label>
        <input id="ingredient" v-model="localSearchTerm.ingredient" type="text" placeholder="Enter ingredient">
      </div>
      <div class="actions">
        <button type="button" @click="handleClose">Cancel</button>
        <button type="submit">Search</button>
      </div>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch, withDefaults } from 'vue';
import { SearchMeals } from '@/lib/types';

interface Props {
  showModal: boolean;
  handleClose: () => void;
  searchTerm: SearchMeals;
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  handleClose: () => console.log('handleClose'),
});

const emit = defineEmits(['search-submitted']);

// Create a local copy of the searchTerm prop
const localSearchTerm = ref({ ...props.searchTerm });

// Update the local copy when the searchTerm prop changes
watch(
  () => props.searchTerm,
  (newVal) => {
    localSearchTerm.value = { ...newVal };
  },
  { deep: true }
);

const submitSearch = () => {
  emit('search-submitted', localSearchTerm.value);
  props.handleClose();
};
</script>


<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>


