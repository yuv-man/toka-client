<template>
  <div class="task-item">
    <div v-if="isEditing" class="edit-form">
      <TaskForm
        :projectId="isEditing ? task.projectId : projectId"
        :task="task"
        :isEditing="isEditing"
        @submit="saveEdit"
        @close="cancelEdit"
      />
    </div>

    <div v-else class="task-content">
      <div class="task-header">
        <h3>{{ task.name }}</h3>
        <div class="status-badge" :class="task.state">
          {{ task.state }}
        </div>
      </div>
      <p>{{ task.notes }}</p>
      <p>Due Date: {{ new Date(task.dueDate).toLocaleDateString() }}</p>
      <div class="actions">
        <select
          :value="task.state"
          @change="updateState($event.target.value)"

        >
          <option value="CREATED">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Done</option>
        </select>
        <button @click="startEdit">Edit</button>
        <button @click="$emit('delete', task._id)" class="delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  components: {
    TaskForm: () => import('./TaskForm.vue')
  },

  props: {
    projectId: {
      type: String || undefined,
      required: false
    },
    task: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      isEditing: false
    }
  },

  methods: {
    ...mapActions(['updateTask']),
    startEdit() {
      this.isEditing = true;
    },

    cancelEdit() {
      this.isEditing = false;
    },

    saveEdit(updatedTask) {
      this.updateTask(updatedTask);
      this.isEditing = false;
    },

    updateState(state) {
      this.$emit('update', {
        ...this.task,
        state,
      });
    }
  }
}
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-header h3 {
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.status-badge.todo {
  background-color: #ffeb3b;
  color: #000;
}

.status-badge.in-progress {
  background-color: #2196f3;
  color: white;
}

.status-badge.completed {
  background-color: #4caf50;
  color: white;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-form {
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
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

button.delete {
  background-color: #f44336;
}

button:hover {
  opacity: 0.9;
}
</style>
