import TaskForm from '../components/TaskForm.vue';

export default {
  title: 'Components/TaskForm',
  component: TaskForm
};

export const CreateNewTask = () => ({
  components: { TaskForm },
  template: `
    <TaskForm 
      projectId="project-123"
      :isEditing="false"
      @submit="onSubmit"
      @close="onClose"
    />
  `,
  methods: {
    onSubmit(task) {
      console.log('Task submitted:', task);
    },
    onClose() {
      console.log('Form closed');
    }
  }
});

export const EditTask = () => ({
  components: { TaskForm },
  template: `
    <TaskForm 
      projectId="project-123"
      :isEditing="true"
      :task="{
        _id: 'task-123',
        projectId: 'project-123',
        name: 'Example Task',
        notes: 'These are example notes',
        state: 'CREATED',
        dueDate: new Date().toISOString()
      }"
      @submit="onSubmit"
      @close="onClose"
    />
  `,
  methods: {
    onSubmit(task) {
      console.log('Task updated:', task);
    },
    onClose() {
      console.log('Form closed');
    }
  }
}); 