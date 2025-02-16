<template>
    <div class="project-list">
      <div class="header">
        <h1>Projects</h1>
        <button @click="showCreateForm = true">+ New Project</button>
      </div>
  
      <ProjectForm
        v-if="showCreateForm"
        @close="showCreateForm = false"
        @submit="addProject"
      />
  
      <div class="projects-grid">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @update="updateProject"
          @delete="deleteProject"
        />
      </div>
    </div>
  </template>

<script>
import { mapState, mapActions } from 'vuex';
import ProjectCard from '../../components/ProjectCard.vue';
import ProjectForm from '../../components/ProjectForm.vue';

export default {
  name: 'ProjectsList',
  components: {
    ProjectCard,
    ProjectForm
  },
  
  data() {
    return {
      showCreateForm: false
    };
  },

  computed: {
    ...mapState(['projects', 'tasks'])
  },

  methods: {
    ...mapActions(
    [
      'fetchProjects',
      'addProject',
      'updateProject',
      'deleteProject',
      'fetchTasks',
      'addTask',
      'updateTask',
      'deleteTask'
    ])
  },

  mounted() {
    this.fetchProjects();
    this.fetchTasks();
  }
};
</script>

<style scoped>
.project-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>