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
        <div class="status-badge" :class="task.state.toLowerCase()">
          {{ stateLabel }}
        </div>
      </div>
      <div class="notes">
        <img src="../assets/notes.svg" alt="notes" style="width: 22px; height: 22px; margin-right: 5px;" />
        {{ task.notes }}
      </div>
      <div class="task-footer">
        <div class="due-date-content" :class="{ 'near-due-date': isNearDueDate }">
          <img class="due-date-img" src="../assets/hourglass.svg" alt="dueDate" />
          <span>{{ formatDate(task.dueDate) }}</span>
        </div>
        <div class="actions">
          <select
            :value="task.state"
            @change="updateState($event.target.value)"
          >
            <option value="CREATED">{{ TASK_STATES.CREATED }}</option>
            <option value="IN_PROGRESS">{{ TASK_STATES.IN_PROGRESS }}</option>
            <option value="COMPLETED">{{ TASK_STATES.COMPLETED }}</option>
          </select>
          <button @click="startEdit" class="project-button">
            <img class="button-icon" src="../assets/edit-pencil.svg" alt="edit" />
          </button>
          <button @click="$emit('delete', task._id)" class="project-button delete">
            <img class="button-icon" src="../assets/trash-delete-bin.svg" alt="trash" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { TASK_STATES } from '../enums/taskState'

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
      isEditing: false,
      TASK_STATES
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
    },

    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }
  },

  computed: {
    stateLabel() {
      return TASK_STATES[this.task.state];
    },
    isNearDueDate() {
      const dueDate = new Date(this.task.dueDate);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }
  }
}
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid lightgray;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.status-badge.created {
  background-color: #ffeb3b;
  color: #000;
}

.status-badge.in_progress {
  background-color: #2196f3;
  color: white;
}

.status-badge.completed {
  background-color: #4caf50;
  color: white;
}

.actions {
  display: flex;
  gap: 8px;
}

select {
  padding: 2px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 12px;
  cursor: pointer;
  min-width: 100px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 10px auto;
}

select:hover {
  border-color: #aaa;
}

select:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
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

button.delete {
  background-color: #f44336;
}

button:hover {
  opacity: 0.9;
}

.notes {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: gray;
  margin-top: 0;
  margin-bottom: 0;
  
}

.due-date-img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.due-date-content {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: gray;
  background-color: rgb(229, 227, 227);
  border-radius: 8px;
  padding: 2px 8px;
}

.button-icon {
  height: 16px;
  height: 16px;
}

.task-footer {
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  margin-top: 5px;
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

.near-due-date {
  background-color: #ffebee;
  color: #f44336;
}

.near-due-date img {
  filter: invert(32%) sepia(93%) saturate(2728%) hue-rotate(341deg) brightness(99%) contrast(111%);
}
</style>
