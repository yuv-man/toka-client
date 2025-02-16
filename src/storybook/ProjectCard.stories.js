import { storiesOf } from '@storybook/vue';
import Vuex from 'vuex';
import ProjectCard from '../components/ProjectCard.vue';

const store = new Vuex.Store({
  state: {
    tasks: []
  }
});

// Base component with store
const BaseDecorator = () => ({
  template: '<div style="max-width: 300px; margin: 20px;"><story/></div>',
  store
});

storiesOf('Components/ProjectCard', module)
  .addDecorator(BaseDecorator)
  .add('Default', () => ({
    components: { ProjectCard },
    store: new Vuex.Store({
      state: {
        tasks: []
      }
    }),
    template: `
      <ProjectCard 
        :project="project"
        @update="onUpdate"
        @delete="onDelete"
      />
    `,
    data() {
      return {
        project: {
          _id: '1',
          name: 'Sample Project',
          description: 'This is a sample project description that might be long enough to demonstrate the two-line truncation with an ellipsis at the end.'
        }
      }
    },
    methods: {
      onUpdate(project) {
        console.log('Update:', project);
      },
      onDelete(id) {
        console.log('Delete:', id);
      }
    }
  }))
  .add('With Tasks', () => ({
    components: { ProjectCard },
    store: new Vuex.Store({
      state: {
        tasks: [
          { _id: '1', projectId: '2', state: 'COMPLETED' },
          { _id: '2', projectId: '2', state: 'COMPLETED' },
          { _id: '3', projectId: '2', state: 'IN_PROGRESS' },
          { _id: '4', projectId: '2', state: 'TODO' }
        ]
      }
    }),
    template: `
      <ProjectCard 
        :project="project"
        @update="onUpdate"
        @delete="onDelete"
      />
    `,
    data() {
      return {
        project: {
          _id: '2',
          name: 'Project with Tasks',
          description: 'A project with some tasks to demonstrate the progress bar'
        }
      }
    },
    methods: {
      onUpdate(project) {
        console.log('Update:', project);
      },
      onDelete(id) {
        console.log('Delete:', id);
      }
    }
  }))
  .add('Completed Project', () => ({
    components: { ProjectCard },
    store: new Vuex.Store({
      state: {
        tasks: [
          { _id: '5', projectId: '3', state: 'COMPLETED' },
          { _id: '6', projectId: '3', state: 'COMPLETED' },
          { _id: '7', projectId: '3', state: 'COMPLETED' }
        ]
      }
    }),
    template: `
      <ProjectCard 
        :project="project"
        @update="onUpdate"
        @delete="onDelete"
      />
    `,
    data() {
      return {
        project: {
          _id: '3',
          name: 'Completed Project',
          description: 'A project with all tasks completed'
        }
      }
    },
    methods: {
      onUpdate(project) {
        console.log('Update:', project);
      },
      onDelete(id) {
        console.log('Delete:', id);
      }
    }
  }))
  .add('No Tasks', () => ({
    components: { ProjectCard },
    store: new Vuex.Store({
      state: {
        tasks: []
      }
    }),
    template: `
      <ProjectCard 
        :project="project"
        @update="onUpdate"
        @delete="onDelete"
      />
    `,
    data() {
      return {
        project: {
          _id: '4',
          name: 'New Project',
          description: 'A project with no tasks yet'
        }
      }
    },
    methods: {
      onUpdate(project) {
        console.log('Update:', project);
      },
      onDelete(id) {
        console.log('Delete:', id);
      }
    }
  })); 