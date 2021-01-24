import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    professors: localStorage.getItem("professors")
      ? JSON.parse(localStorage.getItem("professors"))
      : [
          { username: "Admin", nome: "Mario Pinto", password: "Esmad_2021" },
          {
            username: "Admin2",
            nome: "Ricardo Queirós",
            password: "Esmad_2021"
          },
          { username: "Admin3", nome: "Jorgue Lima", password: "Esmad_2021" }
        ],
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
    loggedProfessor: localStorage.getItem("loggedProfessor")
      ? JSON.parse(localStorage.getItem("loggedProfessor"))
      : "",
    bolsas: localStorage.getItem("bolsas")
      ? JSON.parse(localStorage.getItem("bolsas"))
      : [
          {
            id: 1,
            title: "Oferta Blip",
            category: 2,
            description:
              "Excelente oportunidade de emprego e de enriquecer o vosso CV. Para mais informações, contactar a Blip.",
            img:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2wT80KxmAt4CeKITCbU05jwDyr-MDJbkz1Q&usqp=CAU",
            locality: "Porto",
            date: "2021-01-20",
            phone: "932499526",
            email: "communications@blip.pt",
            linkBolsa: "https://blip.pt/contact-us/",
            estado: "ativo"
          },
          {
            id: 2,
            title: "DesignMasters",
            category: 1,
            description:
              "A DesignMasters está a procurar jovens talentos que queiram ingressar no mercado de trabalho. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
            img:
              "https://knoow.net/wp-content/uploads/2016/04/presentation.design.jpg",
            locality: "Braga",
            date: "2021-01-22",
            phone: "913845397",
            email: "communications@designmasters.pt",
            linkBolsa: "https://blip.pt/contact-us/",
            estado: "ativo"
          },
          {
            id: 3,
            title: "DesignMasters (Estágio)",
            category: 3,
            description:
              "A DesignMasters está a procurar jovens talentos que queiram ingressar no mercado de trabalho. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
            img:
              "https://knoow.net/wp-content/uploads/2016/04/presentation.design.jpg",
            locality: "Braga",
            date: "2021-01-24",
            phone: "913845397",
            email: "communications@designmasters.pt",
            linkBolsa: "https://blip.pt/contact-us/",
            estado: "ativo"
          }
        ],

    testimonys: localStorage.getItem("testimonys")
      ? JSON.parse(localStorage.getItem("testimonys"))
      : [],

    events: localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [
          {
            id: 1,
            name: "Plug-IN",
            type: "workshop",
            location: { city: "Póvoa de Varzim" },
            state: "active",
            date: { day: "15-1-2020", hour: "1530" },
            img: "https://www.esmad.ipp.pt/noticias/plug-in/image_large",
            description:
              "Participa no plug-in, o evento certo para encontrar o emprego certo. Inscreve-te já!"
          },
          {
            id: 2,
            name: "Web Summit",
            type: "simeira",
            location: { city: "Lisboa" },
            state: "active",
            date: { day: "15-1-2020", hour: "1530" },
            img:
              "https://web-summit-library.imgix.net/websummit/2018/10/staffgroup.jpg?auto=compress%2Cformat&ixlib=php-1.2.1&s=bbfafdcad5b85917ee9eca631113e96b",
            description:
              "A Web Summit é a maior conferência da Europa em tecnologias, realizada anualmente desde 2009. Aparece!"
          }
        ],
    activeEvent: [],

    categories: [
      {
        id: 1,
        name: "Full-Time"
      },

      {
        id: 2,
        name: "Part-Time"
      },
      {
        id: 3,
        name: "Estágios Profissionais"
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
        value: "seminario",
        text: "Seminários"
      },

      {
        id: 3,
        value: "simeira",
        text: "Simeiras"
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

    getLoggedProfessor: state => state.loggedProfessor,

    isLoggedProfessor: state => (state.loggedProfessor == "" ? false : true),

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
      let citys = [];
      state.events.forEach(event => {
        citys.some(obj => obj === event.location.city)
          ? {}
          : citys.push(event.location.city);
      });

      return citys;
    },

    getNextEventId: state => {
      return state.events.length
        ? state.events[state.events.length - 1].id + 1
        : {};
    },

    getTestimonys: state => {
      return state.testimonys;
    },

    getBolsaById: state => id => {
      const bolsaById = state.bolsas.find(bolsa => bolsa.id === id);
      return bolsaById;
    },
    getBolsasFiltered: state => (category, locality, _sort) => {
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
    loginProfessor(context, payload) {
      /* Verificar se o user existe para efetuar o login */
      const professor = context.state.professors.find(
        professor =>
          professor.username === payload.username &&
          professor.password === payload.password
      );
      if (professor != undefined) {
        /* Username e password estão match */
        context.commit("LOGIN_PROFESSOR", professor);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(context.state.loggedUser)
        );
        localStorage.setItem(
          "loggedProfessor",
          JSON.stringify(context.state.loggedProfessor)
        );
      } else {
        /* Falhou login e fazemos throw de um erro */
        throw "Professor Username ou palava passe inválidas!";
      }
    },
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
        context.commit("LOGIN_USER", user);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(context.state.loggedUser)
        );
        localStorage.setItem(
          "loggedProfessor",
          JSON.stringify(context.state.loggedProfessor)
        );
      } else {
        /* Falhou login e fazemos throw de um erro */
        throw "Numero de estudante ou palava passe inválidas!";
      }
    },
    logoutUser(context) {
      context.commit("LOGOUT_USER");
      localStorage.removeItem("loggedUser");
    },
    logoutProfessor(context) {
      context.commit("LOGOUT_PROFESSOR");
      localStorage.removeItem("loggedProfessor");
    },
    register(context, payload) {
      /* verificar se este user já existe */
      const userWithSameNumeroEstudante = context.state.users.find(
        user => user.numeroEstudante === payload.numeroEstudante
      );

      const userWithSameEmail = context.state.users.find(
        user => user.email === payload.email
      );
      if (userWithSameEmail == undefined) {
        if (userWithSameNumeroEstudante == undefined) {
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
      } else {
        /* O email já se encontra em uso, por isso damos erro. */
        throw "O email já esta registrado.";
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
        context.commit("LOGIN_USER", user);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(context.state.loggedUser)
        );
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
    },
    createEvent(context, event) {
      context.commit("SAVE_EVENT", event);
    }
  },
  mutations: {
    LOGIN_PROFESSOR(state, professor) {
      state.loggedProfessor = professor;
      state.loggedUser = "";
    },
    LOGIN_USER(state, user) {
      state.loggedUser = user;
      state.loggedProfessor = "";
    },
    LOGOUT_USER(state) {
      state.loggedUser = "";
    },
    LOGOUT_PROFESSOR(state) {
      state.loggedProfessor = "";
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
    },
    SAVE_EVENT(state, event) {
      state.events.push(event);
      localStorage.setItem("events", JSON.stringify(state.events));
    }
  }
});
