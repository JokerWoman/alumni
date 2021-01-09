import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Eventos from "../views/Eventos.vue";
import Bolsas from "../views/Bolsas.vue";
import Perfil from "../views/Perfil.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EditarPerfil from "../views/EditarPerfil.vue";
import store from "../store";
import AdicionarBolsa from "../views/AdicionarBolsa.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/editarPerfil",
    name: "EditarPerfil",
    component: EditarPerfil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/eventos",
    name: "Eventos",
    component: Eventos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/bolsas",
    name: "Bolsas",
    component: Bolsas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/adicionarBolsa",
    name: "AdicionarBolsa",
    component: AdicionarBolsa,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /* Sempre que uma das routes seja pedida e o utilizador não estiver logged in
      enviamos a route para o home caso contrário deixamos ir para a route */
  if (to.meta.requiresAuth === true && !store.getters.isLoggedUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
