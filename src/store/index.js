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
    usersCursosHistorico: localStorage.getItem("usersCursosHistorico")
      ? JSON.parse(localStorage.getItem("usersCursosHistorico"))
      : [],
    usersNetwork: localStorage.getItem("usersNetwork")
      ? JSON.parse(localStorage.getItem("usersNetwork"))
      : [],
    cursos: localStorage.getItem("cursos")
      ? JSON.parse(localStorage.getItem("cursos"))
      : [
          { title: "Licenciatura em Fotografia" },
          { title: "Licenciatura em Multimédia" },
          {
            title:
              "Licenciatura em Tecnologia e Sistemas de Informação para a Web"
          },
          { title: "Mestrado em Design" },
          { title: "Mestrado em Sistemas e Media Interativos" }
        ],
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

    testimonys: localStorage.getItem("testimonys")
      ? JSON.parse(localStorage.getItem("testimonys"))
      : [],

    events: localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
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
    ],

    eventTypes: [
      {
        id: 1,
        value: "workshops",
        text: "WorkShops"
      },

      {
        id: 2,
        value: "seminarios",
        text: "Seminários"
      }
    ]
  },
  getters: {
    getToolsAvailable: state =>
      state.tools /* Get de todas as tools que podem ser adicionadas no perfil de um utilizador */,

    getCursosAvailable: state =>
      state.cursos /* Get de todos os cursos que podem ser adicionados no perfil de um utilizador */,

    getSkillsAvailable: state =>
      state.skills /* Get de todas as skills que podem ser adicionadas no perfil de um utilizador */,

    getLoggedUser: state => state.loggedUser,

    isLoggedUser: state => (state.loggedUser == "" ? false : true),
    getAllAlumnisInformationExceptLoggedUser: state => {
      return state.users.filter(
        user =>
          parseInt(user.numeroEstudante) !=
          parseInt(state.loggedUser.numeroEstudante)
      );
    },
    getUserInformationByUsername: state => numeroEstudante => {
      const user = state.users.find(
        user => parseInt(user.numeroEstudante) === parseInt(numeroEstudante)
      );
      return user;
    },
    getUserSkillsByNumeroEstudante: state => numeroEstudante => {
      /* Get de todas as skills e tools que já estão adicionadas no perfil de um estudante */
      let userSkills = state.usersSkills.filter(
        userSkill =>
          parseInt(userSkill.numeroEstudante) === parseInt(numeroEstudante)
      );
      return userSkills;
    },
    getUsersCursosHistoricoByNumeroEstudante: state => numeroEstudante => {
      /* Get de todos os cursos que já estão adicionadas no perfil de um estudante */
      let usersCursosHistorico = state.usersCursosHistorico.filter(
        cursosHistorico =>
          parseInt(cursosHistorico.numeroEstudante) ===
          parseInt(numeroEstudante)
      );
      return usersCursosHistorico;
    },
    isAlumniInLoggedUserNetwork: state => numeroEstudante => {
      let alumniInLoggedUsedNetwork = false;

      let loggedUserNetwork = state.usersNetwork.find(
        userNetwork =>
          parseInt(userNetwork.numeroEstudante) ===
          parseInt(state.loggedUser.numeroEstudante)
      );

      if (loggedUserNetwork !== undefined) {
        let result = loggedUserNetwork.networking.find(
          network => parseInt(network) === parseInt(numeroEstudante)
        );

        if (result !== undefined) {
          alumniInLoggedUsedNetwork = true;
        }
      }

      return alumniInLoggedUsedNetwork;
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
    },

    getEvents: state => {
      return state.events;
    },

    getEventTypes: state => {
      return state.eventTypes;
    },

    getEventLocations: state => {
      let eventCitys = [];
      state.events.forEach(event => {
        eventCitys.some(
          existingEvent => existingEvent.location.city == event.location.city
        )
          ? {}
          : eventCitys.push(event.location.city);
      });

      return eventCitys;
    },

    getTestimonys: state => {
      return state.testimonys;
    },

    getBolsaById: state => id => {
      const bolsaById = state.bolsas.find(bolsa => bolsa.id === id);
      return bolsaById;
    },
    getBolsasFiltered: state => (category, locality, _sort) => {
      /*
      const cards_filtered = state.bolsas.filter(
        (bolsa) => bolsa.category == category || category =="all"
      );
      return cards_filtered .filter(
        bolsa => bolsa.locality.toUpperCase().includes(locality)
     )*/
      const cards_filtered = state.bolsas.filter(
        bolsa => bolsa.category == category || category == "all"
      );
      const cards_filter1 = cards_filtered.filter(bolsa =>
        bolsa.locality.toUpperCase().includes(locality)
      );
      return cards_filter1.sort((a, b) => {
        if (a.date > b.date) return -1 * _sort;
        if (a.date < b.date) return 1 * _sort;
        return 0;
      });
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

        /* Depois de criar uma conta para o alumni temos
           que criar uma referencia do networking deste novo
           alumni
        */
        context.commit("REGISTER_NETWORKING", {
          /* Quando o utilizador se regista não tem nenhuma skill! */
          numeroEstudante: payload.numeroEstudante,
          networking: [] /* Vai ter os numero de estudante dos alumnis que o utilizador segue */
        });
        localStorage.setItem(
          "usersNetwork",
          JSON.stringify(context.state.usersNetwork)
        );

        /* Depois de criar uma conta para o alumni temos
           que criar uma lista de cursos deste novo
           alumni
          */
        context.commit("REGISTER_CURSOS", {
          /* Quando o utilizador se regista não tem nenhuma skill! */
          numeroEstudante: payload.numeroEstudante,
          cursos: [] /* Vai ter os titulos dos cursos e o ano da conclusão */
        });
        localStorage.setItem(
          "usersCursosHistorico",
          JSON.stringify(context.state.usersCursosHistorico)
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

      /* Actualizar os cursos */
      localStorage.setItem(
        "usersCursosHistorico",
        JSON.stringify(context.state.usersCursosHistorico)
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
    unFollowAlumni(context, payload) {
      /* Editar os dados  */
      context.commit("UNFOLLOW_ALUMNI", payload);
      localStorage.setItem(
        "usersNetwork",
        JSON.stringify(context.state.usersNetwork)
      );
    },
    followAlumni(context, payload) {
      /* Editar os dados  */
      context.commit("FOLLOW_ALUMNI", payload);
      localStorage.setItem(
        "usersNetwork",
        JSON.stringify(context.state.usersNetwork)
      );
    },
    saveBolsa(context, bolsa) {
      context.commit("SAVE_BOLSA", bolsa);
    },
    deleteBolsa(context, id) {
      context.commit("REMOVE_BOLSA", id);
    },
    saveTestimony(context, testimony) {
      context.commit("SAVE_TESTIMONY", testimony);
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
    REGISTER_CURSOS(state, userCursoHistoricoData) {
      state.usersCursosHistorico.push(userCursoHistoricoData);
    },
    REGISTER_NETWORKING(state, userNetworkData) {
      state.usersNetwork.push(userNetworkData);
    },
    UNFOLLOW_ALUMNI(state, numeroEstudante) {
      /* Actualizar tools e skills do utilizador */
      state.usersNetwork.map(function(userNetwork) {
        if (userNetwork.numeroEstudante === state.loggedUser.numeroEstudante) {
          userNetwork.networking = userNetwork.networking.filter(
            networkingNumeroEstudante =>
              networkingNumeroEstudante != numeroEstudante
          );
        }
        return userNetwork;
      });
    },
    FOLLOW_ALUMNI(state, numeroEstudante) {
      /* Actualizar tools e skills do utilizador */
      state.usersNetwork.map(function(userNetwork) {
        if (userNetwork.numeroEstudante === state.loggedUser.numeroEstudante) {
          userNetwork.networking.push(numeroEstudante);
        }
        return userNetwork;
      });
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

      /* Actualizar os cursos do utilizador */
      state.usersCursosHistorico.map(function(userCursoHistorico) {
        if (
          userCursoHistorico.numeroEstudante ===
          state.loggedUser.numeroEstudante
        ) {
          return {
            numeroEstudante: state.loggedUser.numeroEstudante,
            cursos: editarPayload.editUsersCursosHistorico[0].cursos
          };
        } else {
          return userCursoHistorico;
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
    },
    SAVE_TESTIMONY(state, testimony) {
      state.testimonys.push(testimony);
      localStorage.setItem("testimonys", JSON.stringify(state.testimonys));
    }
  }
});
