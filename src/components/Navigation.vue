<template>
  <nav class="master-navigation">    
    <div class="nav-section">
      <div class="section-title">
        <img src="../assets/project.svg" alt="project" style="width: 12px; height: 12px; margin-right: 5px;" />
        <span>Projects</span>
      </div>
      <router-link class="child" to="/projects">All Projects</router-link>
      <router-link 
        v-for="project in projects" 
        :key="project._id"
        :to="{ name: 'project-details', params: { id: project._id }}" 
        class="child"
      >
        {{ project.name }}
      </router-link>
    </div>

    <div class="nav-section">
      <div class="section-title">
        <img src="../assets/task.svg" alt="task" style="width: 12px; height: 12px; margin-right: 5px;" />
        <span>Tasks</span>
      </div>
      <router-link class="child" to="/tasks" exact>All Tasks</router-link>
      <router-link 
        class="child" 
        :to="{ path: '/tasks', query: { state: 'CREATED' }}"
        exact
      >To Do</router-link>
      <router-link 
        class="child" 
        :to="{ path: '/tasks', query: { state: 'IN_PROGRESS' }}"
        exact
      >In Progress</router-link>
      <router-link 
        class="child" 
        :to="{ path: '/tasks', query: { state: 'COMPLETED' }}"
        exact
      >Done</router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['projects']),
      projectId() {
        return this.$route.params.projectId;
      }
    }
  }
</script>

<style lang="less">
nav.master-navigation {
  padding: 20px;
  .master-logo {
    font-size: 24px;
    min-height: 56px;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
  }
  .nav-section {
    margin-bottom: 16px;
    
    .section-title {
      font-weight: bold;
      margin-bottom: 8px;
    }
  }
  a {
    font-weight: bold;
    display: flex;
    color: inherit;
    margin-left: 16px;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;

    &.router-link-active {
      background-color: #f0f0f0;
      color: #333;
    }

    &.child {
      font-weight: normal;
      font-size: 14px;
    }
  }
}
</style>