<template>
    <div :class="['task-form', isEditing ? '' : 'frame']">
        <button class="close-btn" @click="$emit('close')">X</button>
      <h2>{{ isEditing ? 'Edit Task' : 'Add New Task' }}</h2>
      <form @submit.prevent="submitTask">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            placeholder="Task name"
          >
          <span v-if="showError" class="error-message">Task name is required</span>
        </div>
        <textarea
          v-model="notes"
          placeholder="Task notes"
        ></textarea>
        <input
          v-model="dueDate"
          type="date"
          placeholder="Due date"
        >
        <button type="submit">{{ isEditing ? 'Update Task' : 'Add Task' }}</button>
      </form>
    </div>
  </template>

<script>
export default {
  props: {
    projectId: {
      type: String,
      required: true
    },
    task: {
      type: Object,
      required: false
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      name: this.task ? this.task.name : '',
      notes: this.task ? this.task.notes : '',
      dueDate: this.task ? this.formatDate(this.task.dueDate) : this.formatDate(new Date()),
      state: this.task ? this.task.state : 'CREATED',
      showError: false
    };
  },

  methods: {
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },

    submitTask() {
      if (!this.name.trim()) {
        this.showError = true;
        return;
      }
      this.showError = false;

      const task = {
        _id: this.isEditing ? this.task._id : undefined,
        projectId: this.isEditing ? this.task.projectId : this.projectId,
        name: this.name,
        notes: this.notes,
        state: this.state,
        dueDate: new Date(this.dueDate)
      };

      this.$emit('submit', task);
      this.name = '';
      this.notes = '';
      this.dueDate = this.formatDate(new Date());
    }
  }
};
</script>

<style scoped>
.task-form {
  position: relative;
  margin-bottom: 10px;
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

.close-btn {
  position: absolute;
  top: 8px;
  right: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #888;
}

.close-btn:hover {
  color: #888;
  background-color: white;
}

.frame {
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid lightgray;
  border-radius: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>