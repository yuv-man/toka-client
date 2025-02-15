<template>
  <div v-if="project" class="project-detail">
    <div class="header">
      <h1>{{ project.name }}</h1>
      <p>{{ project.description }}</p>
    </div>

    <div class="tasks-section">
      <TaskForm 
        v-if="showTaskForm"
        :projectId="id" 
        @submit="handleTaskSubmit" 
        @close="showTaskForm = false"
      />
      <button 
        class="add-task-btn" v-else @click="showTaskForm = true"><strong>+</strong> Add Task
      </button>

      <TaskList
        :projectId="id || undefined"
        @update="updateTask"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import TaskList from '../../components/TasksList.vue';
import TaskForm from '../../components/TaskForm.vue';

export default {
  name: 'ProjectDetails',
  components: {
    TaskList,
    TaskForm
  },
  data() {
    return {
      project: null,
      showTaskForm: false
    };
  },
  computed: {
    ...mapState(['tasks']),
    ...mapGetters(['getProjectById']),
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions(['addTask', 'updateTask', 'deleteTask', 'searchTasks']),
    async initialProject() {
      this.project = await this.getProjectById(this.id);
      //await this.searchTasks({ projectId: this.id });
    },
    handleTaskSubmit(task) {
      this.addTask(task);
      this.showTaskForm = false;
    }
  },
  watch: {
    id: {
      handler: 'initialProject',
      immediate: true
    }
  },
}
</script>

<style scoped>
.project-detail {
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  margin-bottom: 0.5rem;
}

.tasks-section {
  margin-top: 2rem;
}

.add-task-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.add-task-btn:hover {
  background-color: #45a049;
}
</style>