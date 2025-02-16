<template>
    <div class="modal-overlay">
      <div class="project-form">
        <h2>{{isEditing ? "Edit Project" : "Create New Project"}} </h2>
        <form @submit.prevent="submitProject">
          <input
            v-model="name"
            type="text"
            placeholder="Project name"
            required
          >
          <textarea
            v-model="description"
            placeholder="Project description"
          ></textarea>

          <div class="actions">
            <button type="submit">{{ isEditing ? 'Update Project' : 'Create Project' }}</button>
            <button type="button" @click="$emit('close')" class="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script>

export default {
  name: 'ProjectForm',
  props: {
    project: {
      type: Object,
      require: false
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: this.project?.name || '',
      description: this.project?.description || ''
    };
  },
  methods: {
    submitProject() {
      if (!this.name.trim()) return;

      const project = {
        ...(this.project?._id && { _id: this.project._id }),
        name: this.name,
        description: this.description,
      };

      this.$emit('submit', project);
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.project-form {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

button.cancel {
  background-color: #9e9e9e;
}

button:hover {
  opacity: 0.9;
}
</style>