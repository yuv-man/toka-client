<template>
  <div class="task-list">
    <TaskCard
      v-for="task in projectTasks"
      :projectId="projectId"
      :key="task.id"
      :task="task"
      @update="updateTaskAction"
      @delete="deleteTaskAction"
    />
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    TaskCard
  },

  props: {
    projectId: {
      type: String || undefined,
      required: false
    },
    filter: {
      type: String,
      require: false,
      default: ""
    },
    searchQuery: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(['tasks']),
    tasksState() {
      let queryState = this.$route.query.state;
      if (this.filter) {
        queryState = this.filter;
      }
      return queryState || null;
    },
    projectTasks() {
      if (!this.projectId && !this.tasksState && !this.searchQuery) return this.tasks;
      return this.tasks.filter(task => {
        const matchesProject = !this.projectId || task.projectId === this.projectId;
        const matchesState = !this.tasksState || task.state === this.tasksState;
        const matchesSearch = !this.searchQuery || 
          task.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesProject && matchesState && matchesSearch;
      });
    }
  }, 
  methods: {
    ...mapActions(['deleteTask', 'updateTask']),
    deleteTaskAction(taskId) {
      this.deleteTask(taskId)
    },
    updateTaskAction(task) {
      this.updateTask(task)
    }
  } 
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>