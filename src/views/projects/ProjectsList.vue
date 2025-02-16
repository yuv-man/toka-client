<template>
    <div class="project-list">
      <ErrorMessage 
        v-if="error"
        :message="error"
        @close="clearError"
      />
      
      <div class="header">
        <h1>Projects</h1>
        <button @click="showCreateForm = true">+ New Project</button>
      </div>
  
      <ProjectForm
        v-if="showCreateForm"
        @close="showCreateForm = false"
        @submit="handleAddProject"
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
import { mapState, mapActions, mapGetters } from 'vuex';
import ProjectCard from '../../components/ProjectCard.vue';
import ProjectForm from '../../components/ProjectForm.vue';
import ErrorMessage from '../../components/ErrorMessage.vue';

export default {
  name: 'ProjectsList',
  components: {
    ProjectCard,
    ProjectForm,
    ErrorMessage
  },
  
  data() {
    return {
      showCreateForm: false
    };
  },

  computed: {
    ...mapState(['projects', 'tasks']),
    ...mapGetters(['errorMessage']),
    error() {
      return this.errorMessage;
    }
  },

  methods: {
    ...mapActions([
      'fetchProjects',
      'addProject',
      'updateProject',
      'deleteProject',
      'fetchTasks',
      'addTask',
      'updateTask',
      'deleteTask'
    ]),

    clearError() {
      this.$store.commit('SET_ERROR', null);
    },

    async handleAddProject(project) {
      try {
        await this.addProject(project);
        this.showCreateForm = false;
      } catch (error) {
        console.error('Failed to add project:', error);
      }
    }
  },

  mounted() {
    this.fetchProjects().catch(error => {
      console.error('Failed to fetch projects:', error);
    });
    this.fetchTasks().catch(error => {
      console.error('Failed to fetch tasks:', error);
    });
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