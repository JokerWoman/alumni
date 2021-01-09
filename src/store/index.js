import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
    usersSkills: localStorage.getItem("usersSkills")
      ? JSON.parse(localStorage.getItem("usersSkills"))
      : [],
    skills: localStorage.getItem("skills")
      ? JSON.parse(localStorage.getItem("skills"))
      : [
          { title: "Web Design" },
          { title: "Website Markup" },
          { title: "One Page" },
          { title: "Mobile Template" },
          { title: "Backend API" }
        ],
    tools: localStorage.getItem("tools")
      ? JSON.parse(localStorage.getItem("tools"))
      : [
          { title: "Adobe Illustrator" },
          { title: "Adobe Photoshop" },
          { title: "Adobe After Effects" },
          { title: "Adobe Premiere" },
          { title: "Adobe XD" }
        ],
    loggedUser: localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : "",
    bolsas: localStorage.getItem("bolsas")
      ? JSON.parse(localStorage.getItem("bolsas"))
      : [],
    categories: [
      {
        id: 1,
        name: "Bolsas de emprego"
      },
      {
        id: 2,
        name: "Estágios Profissionais"
      },
      {
        id: 3,
        name: "Part-time"
      }
    ]
  },
  getters: {
    getToolsAvailable: state =>
      state.tools /* Get de todas as tools que podem ser adicionadas no perfil de um utilizador */,
    getSkillsAvailable: state =>
      state.skills /* Get de todas as skills que podem ser adicionadas no perfil de um utilizador */,
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state => (state.loggedUser == "" ? false : true),
    getLoggedUserSkills: state => {
      /* Get de todas as skills e tools que já estão adicionadas no perfil do utilizador logged */
      let userSkills = state.usersSkills.filter(
        userSkill =>
          userSkill.numeroEstudante === state.loggedUser.numeroEstudante
      );
      return userSkills;
    },
    getCategoriesForSelect: state =>
      state.categories.map(category => ({
        value: category.id,
        text: category.name
      })),

    getNextBolsaId: state => {
      return state.bolsas.length > 0
        ? state.bolsas[state.bolsas.length - 1].id + 1
        : 1;
    },

    getCategories(state) {
      return state.categories;
    },
    getBolsas: state => {
      return state.bolsas;
    }
  },
  actions: {
    login(context, payload) {
      /* Verificar se o user existe para efetuar o login */
      const user = context.state.users.find(
        user =>
          user.numeroEstudante === payload.numeroEstudante &&
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
        user => user.numeroEstudante === payload.numeroEstudante
      );
      if (user == undefined) {
        /* numero de estudante não existe por isso
                   podemos registar este novo numero de estudante 
                */
        context.commit("REGISTER", payload);
        localStorage.setItem("users", JSON.stringify(context.state.users));

        /* Depois de criar uma conta para o alumni temos
           que criar uma referencia das suas skills vazia 
        */

        context.commit("REGISTER_SKILLS", {
          /* Quando o utilizador se regista não tem nenhuma skill! */
          numeroEstudante: payload.numeroEstudante,
          skills: [],
          tools: []
        });
        localStorage.setItem(
          "usersSkills",
          JSON.stringify(context.state.usersSkills)
        );
      } else {
        /* O user já existe, por isso damos erro. */
        throw "O numero de estudante já esta registrado.";
      }
    },
    editar(context, payload) {
      /* Editar os dados  */
      context.commit("EDITAR", payload);
      localStorage.setItem("users", JSON.stringify(context.state.users));

      /* Actualizar as skills e as tools */
      localStorage.setItem(
        "usersSkills",
        JSON.stringify(context.state.usersSkills)
      );

      /* Atualizar o logged user com os novos dados no loggedUser*/
      const user = context.state.users.find(
        user =>
          user.numeroEstudante === context.state.loggedUser.numeroEstudante
      );
      if (user != undefined) {
        context.commit("LOGIN", user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
      }
    },
    saveBolsa(context, bolsa) {
      context.commit("SAVE_BOLSA", bolsa);
    },
    deleteBolsa(context, id) {
      context.commit("REMOVE_BOLSA", id);
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
    },
    REGISTER_SKILLS(state, userSkillData) {
      state.usersSkills.push(userSkillData);
    },
    EDITAR(state, editarPayload) {
      /* Atualizar os dados do utilizador que esta logado no array de utilizadores */
      state.users.map(function(user) {
        if (user.numeroEstudante === state.loggedUser.numeroEstudante) {
          user.descricao = editarPayload.descricao;
          user.morada = editarPayload.morada;
          user.telemovel = editarPayload.telemovel;
        } else {
          return user;
        }
      });

      /* Actualizar tools e skills do utilizador */
      state.usersSkills.map(function(userSkill) {
        if (userSkill.numeroEstudante === state.loggedUser.numeroEstudante) {
          return {
            numeroEstudante: state.loggedUser.numeroEstudante,
            skills: editarPayload.editUsersSkills[0].skills,
            tools: editarPayload.editUsersSkills[0].tools
          };
        } else {
          return userSkill;
        }
      });
    },
    SAVE_BOLSA(state, bolsa) {
      state.bolsas.push(bolsa);
      localStorage.setItem("bolsas", JSON.stringify(state.bolsas));
    },
    REMOVE_BOLSA(state, id) {
      state.bolsas = state.bolsas.filter(bolsa => bolsa.id != id);

      localStorage.setItem("bolsas", JSON.stringify(state.bolsas));
    }
  }
});
