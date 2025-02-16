<template>
  <div class="tasks-container">
    <h1>Tasks</h1>
    <div style="margin-bottom: 10px;">
        <SearchInput
            :modelValue="searchQuery"
            @update:modelValue="searchQuery = $event"
            placeholder="Search tasks..." />
    </div>
    <TaskList 
        :searchQuery="searchQuery" />
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue';
import TaskList from '@/components/TasksList.vue'

export default {
  name: 'TasksView',
  components: {
    TaskList,
    SearchInput
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery() {
      console.log('it changed')
    }
  }
}
</script>

<style scoped>
.tasks-container {
  padding: 1rem;
}

.search-container {
  margin: 1rem 0;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>