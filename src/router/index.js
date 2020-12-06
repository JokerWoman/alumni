import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Eventos from "../views/Eventos.vue";
import Bolsas from "../views/Bolsas.vue";
import Perfil from "../views/Perfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/eventos",
    name: "Eventos",
    component: Eventos
  },
  {
    path: "/bolsas",
    name: "Bolsas",
    component: Bolsas
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
