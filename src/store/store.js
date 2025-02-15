import Vue from 'vue';
import Vuex from 'vuex';
import socketService from '../utils/socket';
import { projectAPI, taskAPI } from '../utils/api';
import { changeTypes, modelNames } from '../utils/constants';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  
  state: {
    projects: [],
    tasks: [],
    currentProject: null,
    currentTask: null,
    loading: {
      projects: false,
      tasks: false
    },
    error: null
  },

  mutations: {
    SET_LOADING(state, { type, status }) {
      state.loading[type] = status;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },

    // Project mutations
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },

    SET_CURRENT_PROJECT(state, project) {
      state.currentProject = project;
    },

    ADD_PROJECT(state, project) {
      if (!state.projects.find(p => p._id === project._id)) {
        state.projects.push(project);
      }
    },
    
    UPDATE_PROJECT(state, project) {
      const index = state.projects.findIndex(p => p._id === project._id);
      if (index !== -1) {
        Vue.set(state.projects, index, project);
      }
    },
    
    DELETE_PROJECT(state, projectId) {
      state.projects = state.projects.filter(p => p._id !== projectId);
      if (state.currentProject?._id === projectId) {
        state.currentProject = null;
      }
      // Also delete associated tasks
      state.tasks = state.tasks.filter(t => t.projectId !== projectId);
    },

    // Task mutations
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },

    SET_CURRENT_TASK(state, task) {
      state.currentTask = task;
    },

    ADD_TASK(state, task) {
      if (!state.tasks.find(t => t._id === task._id)) {
        state.tasks.push(task);
      }
    },

    UPDATE_TASK(state, task) {
      const index = state.tasks.findIndex(t => t._id === task._id);
      if (index !== -1) {
        Vue.set(state.tasks, index, task);
      }
    },

    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(t => t._id !== taskId);
      if (state.currentTask?._id === taskId) {
        state.currentTask = null;
      }
    }
  },

  actions: {
    // Project actions
    async fetchProjects({ commit }) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        const response = await projectAPI.getAll();
        commit('SET_PROJECTS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    async fetchProject({ commit }, projectId) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        const response = await projectAPI.getById(projectId);
        commit('SET_CURRENT_PROJECT', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    async searchProjects({ commit }, criteria) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        const response = await projectAPI.search(criteria);
        commit('SET_PROJECTS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    async addProject({ commit }, project) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        if (!project.name) {
          throw new Error('Project name is required');
        }
        const response = await projectAPI.create(project);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    async updateProject({ commit }, project) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        const response = await projectAPI.update(project);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    async deleteProject({ commit }, projectId) {
      commit('SET_LOADING', { type: 'projects', status: true });
      try {
        await projectAPI.delete(projectId);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'projects', status: false });
      }
    },

    // Task actions
    async fetchTasks({ commit }) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        const response = await taskAPI.getAll();
        commit('SET_TASKS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    },

    async fetchTask({ commit }, taskId) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        const response = await taskAPI.getById(taskId);
        commit('SET_CURRENT_TASK', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    },

    async searchTasks({ commit }, criteria) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        const response = await taskAPI.search(criteria);
        commit('SET_TASKS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    },

    async addTask({ commit }, task) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        const response = await taskAPI.create(task);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    },

    async updateTask({ commit }, task) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        const response = await taskAPI.update(task);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    },

    async deleteTask({ commit }, taskId) {
      commit('SET_LOADING', { type: 'tasks', status: true });
      try {
        console.log('Deleting task:', taskId);
        await taskAPI.delete(taskId);
        commit('SET_ERROR', null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', { type: 'tasks', status: false });
      }
    }
  },

  getters: {
    isLoading: state => type => state.loading[type],
    hasError: state => state.error !== null,
    errorMessage: state => state.error,
    
    // Project getters
    allProjects: state => state.projects,
    currentProject: state => state.currentProject,
    getProjectById: state => id => state.projects.find(p => p._id === id),
    
    // Task getters
    allTasks: state => state.tasks,
    currentTask: state => state.currentTask,
    getTaskById: state => id => state.tasks.find(t => t._id === id),
    getTasksByProjectId: state => projectId => 
      state.tasks.filter(task => task.projectId === projectId)
  }
});

// WebSocket message handlers
function handleProjectMessage(type, payload) {
  switch (type) {
    case changeTypes.INSERT:
      store.commit('ADD_PROJECT', payload);
      break;
    case changeTypes.UPDATE:
      store.commit('UPDATE_PROJECT', payload);
      break;
    case changeTypes.DELETE:
      store.commit('DELETE_PROJECT', payload._id);
      break;
  }
}

function handleTaskMessage(type, payload) {
  switch (type) {
    case changeTypes.INSERT:
      store.commit('ADD_TASK', payload);
      break;
    case changeTypes.UPDATE:
      store.commit('UPDATE_TASK', payload);
      break;
    case changeTypes.DELETE:
      store.commit('DELETE_TASK', payload._id);
      break;
  }
}

// Setup WebSocket listeners
function setupWebSocketListeners() {
  socketService.on('message', (message) => {
    try {
      const parsedMessage = typeof message.data === 'string' 
        ? JSON.parse(message.data) 
        : message;
      
      const { type, model, data: payload } = parsedMessage;
      
      switch (model) {
        case modelNames.Project:
          handleProjectMessage(type, payload);
          break;
        case modelNames.Task:
          handleTaskMessage(type, payload);
          break;
        default:
          console.log('Unhandled model type:', model);
      }
    } catch (error) {
      console.error('Error processing websocket message:', error, message);
    }
  });
}

// Initialize WebSocket connection
setupWebSocketListeners();

// Handle WebSocket reconnection
socketService.on('close', () => {
  console.log('WebSocket disconnected, attempting to reconnect...');
  setTimeout(setupWebSocketListeners, 5000);
});

export default store;