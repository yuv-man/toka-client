<template>
    <div class="project-card" @click="handleCardClick">
      <div v-if="!isEditing" class="content">
        <div class="project-name">{{ project.name }}</div>
        <p class="project-description">{{ project.description }}</p>
        <div class="completion-status">
          <div class="completion-header">
            <div style="display: flex; align-items: center;">
              <img class="status-img" src="../assets/status.svg" alt="status">
              <span style="color: gray;">Progress</span>
            </div>
            <span>{{ completedTaskCount }}/{{ projectTasks.length }}</span>
          </div>
          <div class="progress-bar">
            <div :class="['progress', completionPercentage === 100 ? 'completed' : '']" 
                 :style="{ width: `${completionPercentage}%` }">
            </div>
          </div>
        </div>
        <div class="actions" @click.stop>
          <button class="project-button" @click="viewProject">
            <img class="button-icon" src="../assets/eye.svg" alt="eye" />
          </button>
          <button class="project-button" @click="isEditing = true">
            <img class="button-icon" src="../assets/edit-pencil.svg" alt="edit" />
          </button>
          <button class="project-button delete" @click="showDeleteConfirm = true">
            <img class="button-icon" src="../assets/trash-delete-bin.svg" alt="trash" />
          </button>
        </div>
      </div>
      
      <ProjectForm
        v-else
        :isEditing="true"
        :project="project"
        @submit="saveEdit"
        @close="cancelEdit"
      />

      <ConfirmationPopup
        v-if="showDeleteConfirm"
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        confirm-text="Delete"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ConfirmationPopup from './ConfirmationPopup.vue';
import ProjectForm from './ProjectForm.vue';

export default {
  name: 'ProjectCard',
  components: {
    ConfirmationPopup,
    ProjectForm
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isEditing: false,
      showDeleteConfirm: false,
    }
  },

  computed: {
    ...mapState(['tasks']),
    projectTasks() {
        return this.tasks.filter(task => task.projectId === this.project._id);
    },
    completedTaskCount() {
      return this.projectTasks.filter(task => task.state === 'COMPLETED').length;
    },
    completionPercentage() {
      if (!this.projectTasks || this.projectTasks.length === 0) return 0;
      return Math.round((this.completedTaskCount / this.projectTasks.length) * 100);
    }
  },

  methods: {
    handleCardClick() {
      if (!this.isEditing && !this.showDeleteConfirm) {
        this.viewProject();
      }
    },
    saveEdit(formData) {
      this.$emit('update', {
        ...this.project,
        ...formData,
      });
      this.isEditing = false;
    },

    viewProject() {
      this.$router.push(`/project/${this.project._id}`);
    },

    deleteProject() {
      console.log('Deleting project:', this.project);
      this.$emit('delete', this.project._id);
    },

    confirmDelete() {
      this.deleteProject();
      this.showDeleteConfirm = false;
    },

    cancelDelete(e) {
      e?.stopPropagation();
      this.showDeleteConfirm = false;
    },
    cancelEdit(e) {
      e?.stopPropagation();
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
.project-card {
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border:1px solid lightgray;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input, textarea {
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

.project-button {
  height: 26px;
  width: 26px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

button.delete {
  background-color: #f44336;
}

button:hover {
  opacity: 0.9;
}

.completion-status {
  margin: 1rem 0;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
}

.progress {
  height: 100%;
  background-color: #f3ae1a;
  transition: width 0.3s ease;
}

.progress.completed {
  background-color: #4CAF50;
}

.project-name {
  font-size: 18px;
  font-weight: bold;
}

.project-description {
  font-size: 14px;
  color: gray;
  margin-top: 0;
  margin-bottom: 0;
  }

.completion-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  font-weight: 400;
}

.status-img {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}

.button-icon {
  height: 16px;
  height: 16px;
}
</style>