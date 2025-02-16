import TaskCard from '../components/TaskCard.vue';

export default {
  title: 'Components/TaskCard',
  component: TaskCard,
  argTypes: {
    updateTask: { action: 'updateTask' },
    deleteTask: { action: 'deleteTask' },
  },
};

// Create a template for the stories
const Template = (args) => ({
  components: { TaskCard },
  setup() {
    return { args };
  },
  template: '<TaskCard v-bind="args" />'
});

// Base task object for stories
const baseTask = {
  _id: '1',
  name: 'Example Task',
  notes: 'These are some example notes for the task.',
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
  state: 'CREATED',
  projectId: 'project-1'
};

// Default story
export const Default = Template.bind({});
Default.args = {
  task: baseTask,
  projectId: 'project-1'
};

// In Progress state
export const InProgress = Template.bind({});
InProgress.args = {
  task: {
    ...baseTask,
    state: 'IN_PROGRESS'
  },
  projectId: 'project-1'
};

// Completed state
export const Completed = Template.bind({});
Completed.args = {
  task: {
    ...baseTask,
    state: 'COMPLETED'
  },
  projectId: 'project-1'
};

// Near due date
export const NearDueDate = Template.bind({});
NearDueDate.args = {
  task: {
    ...baseTask,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
  },
  projectId: 'project-1'
};

// Long content
export const LongContent = Template.bind({});
LongContent.args = {
  task: {
    ...baseTask,
    name: 'This is a very long task name that might wrap to multiple lines',
    notes: 'These are some very long notes that contain a lot of text. This helps us test how the component handles longer content and ensures proper wrapping and layout maintenance.'
  },
  projectId: 'project-1'
}; 