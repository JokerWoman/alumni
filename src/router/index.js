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
import BolsaVerMais from "../views/BolsaVerMais.vue";
import ProcurarAlumni from "../views/ProcurarAlumni.vue";
import LoginProfessor from "../views/LoginProfessor.vue";

Vue.use(VueRouter);

/*
  IMPORTANTE:
  requiresUserAuth e requiresProfessorAuth nunca podem
  estar os dois a true numa das routes! Apenas um a true!
*/

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresUserAuth: false,
      requiresProfessorAuth: false
    }
  },
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
      requiresProfessorAuth: false
    }
  },
  {
    path: "/bolsas",
    name: "Bolsas",
    component: Bolsas,
    meta: {
      requiresUserAuth: true,
      
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
    path: "/adicionarBolsa",
    name: "AdicionarBolsa",
    component: AdicionarBolsa,
    meta: {
      requiresUserAuth: false,
      requiresProfessorAuth: true
    }
  },
  {
    path: "/bolsas/:bolsaId",
    name: "BolsaVerMais",
    component: BolsaVerMais,
    meta: {
      requiresUserAuth: true,
      requiresProfessorAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /* Sempre que uma das routes seja pedida e o estudante não estiver logged in
     ou o professor nao estiver logged in enviamos a route para o home caso contrário
     deixamos ir para a route
  */

  if (to.meta.requiresUserAuth === true) {
    if (store.getters.isLoggedUser || store.getters.isLoggedProfessor) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.requiresProfessorAuth === true) {
    if (store.getters.isLoggedProfessor) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
