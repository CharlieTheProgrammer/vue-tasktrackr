import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/docs",
    name: "Docs",
    component: () =>
      import(/* webpackChunkName: "docs" */ "../views/Docs.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>  
      import(/* webpackChunkName: "forgot-password" */ "../views/ForgotPassword.vue"),
  },
  {
    path: "/login",
    name: "Login",  
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/projects",
    name: "Projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/Projects.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/workspace",
    name: "Workspace",
    component: () =>
      import(/* webpackChunkName: "workspace" */ "../views/Workspace.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
