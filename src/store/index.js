import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
    loggedUser: localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : ""
  },
  getters: {
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state => (state.loggedUser == "" ? false : true)
  },
  actions: {
    login(context, payload) {
      /* Verificar se o user existe para efetuar o login */
      const user = context.state.users.find(
        user =>
          user.nroEstudante === payload.nroEstudante &&
          user.password === payload.password
      );
      if (user != undefined) {
        /* numero de estudante e passord existem por isso
                   login efectuado com sucesso 
                */
        context.commit("LOGIN", user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
      } else {
        /* Falhou login e fazemos throw de um erro */
        throw "Numero de estudante ou palava passe inválidas!";
      }
    },
    logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("loggedUser");
    },
    register(context, payload) {
      /* verificar se este user já existe */
      const user = context.state.users.find(
        user => user.nroEstudante === payload.nroEstudante
      );
      if (user == undefined) {
        /* numero de estudante não existe por isso
                   podemos registar este novo numero de estudante 
                */
        context.commit("REGISTER", payload);
        localStorage.setItem("users", JSON.stringify(context.state.users));
      } else {
        /* O user já existe, por isso damos erro. */
        throw "O numero de estudante já esta registrado.";
      }
    }
  },
  mutations: {
    LOGIN(state, user) {
      state.loggedUser = user;
    },
    LOGOUT(state) {
      state.loggedUser = "";
    },
    REGISTER(state, user) {
      state.users.push(user);
    }
  }
});
