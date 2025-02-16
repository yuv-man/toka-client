import Vue from "vue";
import VueRouter from "vue-router";
import ProjectsList from "./views/projects/ProjectsList.vue";
import ProjectDetails from "./views/projects/ProjectDetails.vue";
import TasksView from "./views/tasks/TasksView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: ProjectsList,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsList,
  },
  {
    path: "/project/:id",
    name: "project-details",
    component: ProjectDetails,
    props: true,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
