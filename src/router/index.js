import Vue from "vue";
import VueMeta from "vue-meta";

import Router from "vue-router";
import Home from "../views/Home.vue";
import Eventos from "../views/Eventos.vue";
import Bolsas from "../views/Bolsas.vue";
import Perfil from "../views/Perfil.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EditarPerfil from "../views/EditarPerfil.vue";
import EditarPortefolio from "../views/EditarPortefolio.vue";
import EditarCursos from "../views/EditarCursos.vue";
import EditarTools from "../views/EditarTools.vue";
import EditarSkills from "../views/EditarSkills.vue";
import store from "../store";
import BolsaVerMais from "../views/BolsaVerMais.vue";
import ProcurarAlumni from "../views/ProcurarAlumni.vue";
import LoginProfessor from "../views/LoginProfessor.vue";
import EventoVerMais from "../views/EventoVerMais.vue";
import Empresas from "../views/Empresas.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(Router);
Vue.use(VueMeta);

/*
  IMPORTANTE:
  requiresUserAuth e requiresProfessorAuth nunca podem
  estar os dois a true numa das routes! Apenas um a true!
*/

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresUserAuth: false,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/loginProfessor",
    name: "LoginProfessor",
    component: LoginProfessor,
    meta: {
      requiresUserAuth: false,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/editarPerfil",
    name: "EditarPerfil",
    component: EditarPerfil,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/editarTools",
    name: "EditarTools",
    component: EditarTools,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/editarSkills",
    name: "EditarSkills",
    component: EditarSkills,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/editarPortefolio",
    name: "EditarPortefolio",
    component: EditarPortefolio,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/editarCursos",
    name: "EditarCursos",
    component: EditarCursos,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresUserAuth: false,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/eventos",
    name: "Eventos",
    component: Eventos,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: true
    }
  },
  {
    path: "/bolsas",
    name: "Bolsas",
    component: Bolsas,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: true
    }
  },
  {
    path: "/perfil/:numeroEstudante",
    name: "Perfil",
    component: Perfil,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/procurarAlumni/",
    name: "ProcurarAlumni",
    component: ProcurarAlumni,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  },

  {
    path: "/bolsas/:bolsaId",
    name: "BolsaVerMais",
    component: BolsaVerMais,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: true
    }
  },
  {
    path: "/events/:eventId",
    name: "EventoVerMais",
    component: EventoVerMais,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: true
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAlumniAuth: false,
      requiresProfessorAuth: false
    }
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      requiresAlumniAuth: false,
      requiresProfessorAuth: false
    }
  },
  {
    path: "/empresas",
    name: "Empresas",
    component: Empresas
  }
];

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.meta.requiresUserAuth === true &&
    to.meta.requiresProfessorAuth === true
  ) {
    if (store.getters.isLoggedAlumni || store.getters.isLoggedProfessor) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.requiresUserAuth === true) {
    if (store.getters.isLoggedAlumni) {
      next();
    } else {
      next("/");
      return;
    }
  } else if (to.meta.requiresProfessorAuth === true) {
    if (store.getters.isLoggedProfessor) {
      next();
    } else {
      next("/");
      return;
    }
  } else {
    next();
  }
});

export default router;
