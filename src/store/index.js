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
      : ""
  },
  getters: {
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state => (state.loggedUser == "" ? false : true),
    getSkillsStudent: state => numeroEstudante => {
      let userSkills = state.usersSkills.filter(
        userSkill => userSkill.numeroEstudante === numeroEstudante
      );

      if (userSkills.length > 0) {
        return userSkills[0].skills;
      } else {
        return [];
      }
    },
    getToolsStudent: state => numeroEstudante => {
      let userSkills = state.usersSkills.filter(
        userSkill => userSkill.numeroEstudante === numeroEstudante
      );

      if (userSkills.length > 0) {
        return userSkills[0].tools;
      } else {
        return [];
      }
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
          skills: [
            { title: context.state.skills[0].title, percentagem: 25 },
            { title: context.state.skills[1].title, percentagem: 15 }
          ],
          tools: [
            { title: context.state.tools[0].title, percentagem: 70 },
            { title: context.state.tools[1].title, percentagem: 50 }
          ]
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

      /* Atualizar o logged user com os novos dados no loggedUser*/
      const user = context.state.users.find(
        user =>
          user.numeroEstudante === context.state.loggedUser.numeroEstudante
      );
      if (user != undefined) {
        context.commit("LOGIN", user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
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
    }
  }
});
