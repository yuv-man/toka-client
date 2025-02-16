import ProjectForm from '../components/ProjectForm.vue';

export default {
  title: 'Components/ProjectForm',
  component: ProjectForm,
  parameters: {
    componentSubtitle: 'Form for creating and editing projects'
  },
  argTypes: {
    isEditing: {
      control: 'boolean',
      description: 'Controls whether the form is in edit or create mode'
    },
    project: {
      control: 'object',
      description: 'Project data for editing mode'
    }
  }
};

const Template = (args, { argTypes }) => ({
  components: { ProjectForm },
  props: Object.keys(argTypes),
  methods: {
    onSubmit(project) {
      console.log('submit', project);
    },
    onClose() {
      console.log('close');
    }
  },
  template: `
    <ProjectForm 
      v-bind="$props"
      @submit="onSubmit"
      @close="onClose"
    />`
});

export const CreateNew = Template.bind({});
CreateNew.args = {
  isEditing: false,
  project: null
};

export const EditExisting = Template.bind({});
EditExisting.args = {
  isEditing: true,
  project: {
    _id: '1',
    name: 'Example Project',
    description: 'This is an example project description'
  }
};

export const EmptyEdit = Template.bind({});
EmptyEdit.args = {
  isEditing: true,
  project: {
    _id: '2',
    name: '',
    description: ''
  }
}; 