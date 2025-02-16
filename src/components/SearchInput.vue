<template>
  <div class="search">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"    
      class="search-input"
    />
    <img src="../assets/search.svg" alt="search" class="search-icon" />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.search {
  position: relative;
}

.search-input {
  padding: 0.5rem;
  padding-left: 2rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 200px;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 16px;
  pointer-events: none;
}
</style> 