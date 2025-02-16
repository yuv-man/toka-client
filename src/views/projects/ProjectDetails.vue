<template>
  <div v-if="project" class="project-detail">
    <div class="header">
      <div class="project-header">
        <h1>{{ project.name }}</h1>
        <button class="edit-btn" @click="showProjectForm = true">
          <img class="edit-icon" src="../../assets/edit-pencil-grey.svg" alt="edit" />
        </button>
      </div>
      <p class="project-desc">{{ project.description }}</p>
    </div>

    <ProjectForm
      v-if="showProjectForm"
      :isEditing="true"
      :project="project"
      @submit="handleProjectSubmit"
      @close="showProjectForm = false"
    />

    <div class="tasks-section">
      <div class="task-controls">
        <TaskForm 
          v-if="showTaskForm"
          :projectId="id" 
          @submit="handleTaskSubmit" 
          @close="showTaskForm = false"
        />
        <div v-else class="filters-section">
          <div class="search-and-filter">
            <SearchInput
              :modelValue="searchQuery"
              @update:modelValue="searchQuery = $event"
              placeholder="Search tasks..."
            />
            <div class="filter">
              <img src="../../assets/filter.svg" alt="filter" style="width: 16px; height: 16px" />
              <select v-model="taskFilter" class="task-filter">
                <option value="" default>All Tasks</option>
                <option value="CREATED">{{ TASK_STATES.CREATED }}</option>
                <option value="IN_PROGRESS">{{ TASK_STATES.IN_PROGRESS }}</option>
                <option value="COMPLETED">{{ TASK_STATES.COMPLETED }}</option>
              </select>
            </div>
          </div>
          <button 
            class="add-task-btn" 
            @click="showTaskForm = true"
          ><strong>+</strong> Add Task</button>
        </div>
      </div>

      <TaskList
        :projectId="id || undefined"
        :filter="taskFilter"
        :searchQuery="searchQuery"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import TaskList from '../../components/TasksList.vue';
import TaskForm from '../../components/TaskForm.vue';
import ProjectForm from '../../components/ProjectForm.vue';
import SearchInput from '../../components/SearchInput.vue';
import { TASK_STATES } from '@/enums/taskState';

export default {
  name: 'ProjectDetails',
  components: {
    TaskList,
    TaskForm,
    ProjectForm,
    SearchInput
  },
  data() {
    return {
      project: null,
      showTaskForm: false,
      showProjectForm: false,
      taskFilter: '',
      searchQuery: '',
      searchTimeout: null,
      TASK_STATES
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
    ...mapActions(['addTask', 'updateTask', 'deleteTask', 'updateProject']),
    async initialProject() {
      this.project = await this.getProjectById(this.id);
    },
    handleTaskSubmit(task) {
      this.addTask(task);
      this.showTaskForm = false;
    },
    handleProjectSubmit(updatedProject) {
      this.updateProject(updatedProject);
      this.showProjectForm = false;
      this.project = updatedProject;
    },
  },
  watch: {
    id: {
      handler: 'initialProject',
      immediate: true
    }
  },
  beforeDestroy() {
    clearTimeout(this.searchTimeout);
  },
}
</script>

<style scoped>
.project-detail {
  padding: 20px;
}

.header {
  margin-bottom: 10px;
}

.tasks-section {
  margin-top: 20px;
}

.add-task-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: #45a049;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.edit-btn {
  padding: 5px;
  background: none;
  border: 1.5px solid #aaa;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.edit-icon {
  width: 16px;
  height: 16px;
}

.edit-btn:hover {
  color: lightgray;
}

.project-desc {
  margin-top: 0;
  color: grey;
}

.task-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.task-filter {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid white;
  background-color: white;
  cursor: pointer;
}

.filters-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.filter {
  display: flex; 
  align-items: center;
}

.search-and-filter {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>