import Vue from "vue";
import Vuex from "vuex";

//import { UserService } from '@/services/user.service';
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { LinkService } from "@/services/link.service";
import { CursoService } from "@/services/curso.service";
import { TestimonyService } from "@/services/testemunha.service.js"

Vue.use(Vuex);

function GetLoggedUser(state) {
  if (state.loggedUser !== null) {
    return state.loggedUser;
  } else if (state.loggedProfessor !== null) {
    return state.loggedProfessor;
  } else {
    return null;
  }
}

export default new Vuex.Store({
  state: {
    alumnis: [],
    userSkills: [],
    userTools: [],
    userCursos: [],
    userLinks: [],
    userAvailableLinks: [],
    userAvailableCursos: [],
    loggedAlumniInformation: null,
    loggedProfessorInformation: null,
    userInformationByNumeroEstudante: "",
    loggedUser: localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : null,
    loggedProfessor: localStorage.getItem("loggedProfessor")
      ? JSON.parse(localStorage.getItem("loggedProfessor"))
      : null,
    skills: localStorage.getItem("skills")
      ? JSON.parse(localStorage.getItem("skills"))
      : [
          { title: "Web Design" },
          { title: "Programação C#" },
          { title: "Fotografia" },
          { title: "UI/UX Development" },
          { title: "Javascript" }
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
    bolsas: localStorage.getItem("bolsas")
      ? JSON.parse(localStorage.getItem("bolsas"))
      : [
          {
            id: 1,
            category: 2,
            description:
              "Excelente oportunidade de emprego e de enriquecer o vosso CV. Para mais informações, contactar a Blip.",
            img: require("@/assets/img/bolsas/bolsa1.webp"),
            date_pub: "2021-01-20",
            date_start: "2021-01-22",
            linkBolsa: "https://blip.pt/contact-us/",
            estado: "ativo",
            id_company: 1,
            id_professor: 1
          },
          {
            id: 2,
            category: 1,
            description:
              "A Moxy Studio está a procurar jovens talentos que queiram ingressar no mercado de trabalho. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
            img: require("@/assets/img/bolsas/bolsa2.webp"),
            date_pub: "2021-01-22",
            date_start: "2021-01-30",
            linkBolsa: "https://moxy.studio/",
            estado: "ativo",
            id_company: 2,
            id_professor: 1
          },
          {
            id: 3,
            category: 3,
            description:
              "A XDSoftware está a procurar jovens webdesigners. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
            img: require("@/assets/img/bolsas/bolsa3.webp"),
            date_pub: "2021-01-24",
            date_start: "2021-01-30",
            linkBolsa: "https://www.xdsoftware.pt/",
            estado: "ativo",
            id_company: 3,
            id_professor: 1
          }
        ],
    activeBolsa: [],
    companies: localStorage.getItem("companies")
      ? JSON.parse(localStorage.getItem("companies"))
      : [
          {
            id_company: 1,
            name: "Blip",
            phone: "932499526",
            email: "communications@blip.pt",
            locality: "Porto"
          },
          {
            id_company: 2,
            name: "Moxy",
            phone: "913845397",
            email: "communications@moxy.pt",
            locality: "Porto"
          },
          {
            id_company: 3,
            name: "XD Software",
            phone: "913845397",
            email: "communications@xdsoftware.pt",
            locality: "Braga"
          }
        ],
    activeCompany: [],
    testimonies: [],
    events: localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [
          {
            id: 1,
            name: "Plug-IN",
            type: "workshop",
            location: { city: "Póvoa de Varzim" },
            state: "active",
            date: "2021-06-25",
            hour: "13:56:00",
            img: require("@/assets/img/eventos/evento1.webp"),
            description:
              "Participa no plug-in, o evento certo para encontrar o emprego certo. Inscreve-te já!"
          },
          {
            id: 2,
            name: "Web Summit",
            type: "simeira",
            location: { city: "Lisboa" },
            state: "active",
            date: "2021-09-01",
            hour: "13:45:00",
            img: require("@/assets/img/eventos/evento2.webp"),
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
        value: "workshop",
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
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state => (state.loggedUser === null ? false : true),
    getLoggedAlumniInformation: state => state.loggedAlumniInformation,
    getLoggedProfessorInformation: state => state.loggedProfessorInformation,
    getLoggedProfessor: state => state.loggedProfessor,
    isLoggedProfessor: state => (state.loggedProfessor == null ? false : true),
    getAllAlumniInformation: state => {
      /* Quando for o professor dar todos, quando alumni filtrar o seu */
      if (state.alumnis !== null) {
        return state.alumnis.filter(alumni => {
          if (state.loggedUser !== null) {
            /* Quando é o alumnoi então remover o próprio*/ return (
              parseInt(alumni.id_nroEstudante) !== parseInt(state.loggedUser.id)
            );
          } else {
            return true;
          }
        });
      } else {
        return [];
      }
    },

    getUserInformationByNumeroEstudante: state =>
      state.userInformationByNumeroEstudante,
    getUserSkillsByNumeroEstudante: state => state.userSkills,
    getUserToolsByNumeroEstudante: state => state.userTools,
    getUserLinksByNumeroEstudante: state => state.userLinks,
    getUserCursosByNumeroEstudante: state => state.userCursos,
    getUserAvailableLinksByNumeroEstudante: state => state.userAvailableLinks,
    getUserAvailableCursosByNumeroEstudante: state => state.userAvailableCursos,

    getToolsAvailable: state =>
      state.tools /* Get de todas as tools que podem ser adicionadas no perfil de um utilizador */,

    getCursosAvailable: state =>
      state.cursos /* Get de todos os cursos que podem ser adicionados no perfil de um utilizador */,

    AlumniHasCursoByTitle: state => (numeroEstudante, title) => {
      let userCursos = state.userCursos.filter(
        cursosHistorico =>
          parseInt(cursosHistorico.numeroEstudante) ===
          parseInt(numeroEstudante)
      );

      return userCursos[0].cursos.some(curso => curso.title === title);
    },

    getSkillsAvailable: state =>
      state.skills /* Get de todas as skills que podem ser adicionadas no perfil de um utilizador */,

    getCategoriesForSelect: state =>
      state.categories.map(category => ({
        value: category.id,
        text: category.name
      })),

    getCompaniesForSelect: state =>
      state.companies.map(company => ({
        value: company.id_company,
        text: company.name
      })),

    getNextBolsaId: state => {
      return state.bolsas.length > 0
        ? state.bolsas[state.bolsas.length - 1].id + 1
        : 1;
    },

    getNextCompanyId: state => {
      return state.companies.length > 0
        ? state.companies[state.companies.length - 1].id_company + 1
        : 1;
    },

    getCategories(state) {
      return state.categories;
    },

    getBolsas: state => {
      return state.bolsas;
    },

    getActiveBolsa: state => {
      return state.activeBolsa;
    },

    getCompanies: state => {
      return state.companies;
    },

    getActiveCompany: state => {
      return state.activeCompany;
    },

    getCategoryById: state => id => {
      const categoryById = state.categories.find(
        category => category.id === id
      );
      return categoryById;
    },

    getCompanyById: state => id => {
      const companyById = state.companies.find(
        company => company.id_company === id
      );
      return companyById;
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
        citys.some(city => city === event.location.city)
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

    getTestimonies: state => {
      return state.testimonies
    },

    getBolsaById: state => id => {
      const bolsaById = state.bolsas.find(bolsa => bolsa.id === id);
      return bolsaById;
    },
    getBolsasFiltered: state => (category, locality, _sort) => {
      const cards_filtered = state.bolsas.filter(
        bolsa => bolsa.category == category || category == "all"
      );
      const companies = state.companies;
      var cards_filtered1 = [];
      for (var bolsa in cards_filtered) {
        for (var company in companies) {
          if (
            cards_filtered[bolsa].id_company == companies[company].id_company &&
            companies[company].locality.toUpperCase().includes(locality)
          ) {
            cards_filtered1.push(cards_filtered[bolsa]);
          }
        }
      }

      return cards_filtered1.sort((a, b) => {
        if (a.date_pub > b.date_pub) return -1 * _sort;
        if (a.date_pub < b.date_pub) return 1 * _sort;
        return 0;
      });
    },
    getEventById: state => id => {
      return state.events.find(e => e.id == id);
    },
    getActiveEvent: state => {
      return state.activeEvent;
    }
  },
  actions: {
    async RemoveAlumniLoggedCursoById(context, cursoId) {
      await UserService.removeAlumniCursoById(
        context.state.loggedUser,
        cursoId
      );

      /* Trigar o update dos user cursos e dos available cursos. */
      context.dispatch(
        "RetrieveUserCursosByNumeroEstudante",
        context.state.loggedUser.id
      );
      context.dispatch(
        "RetrieveUserAvailableCursosByNumeroEstudante",
        context.state.loggedUser.id
      );
    },
    async AdicionarAlumniLoggedCursoById(context, curso) {
      await UserService.addAlumniCursoById(
        context.state.loggedUser,
        curso.id_cursos,
        curso.anoCurso
      );

      /* Trigar o update dos user cursos e dos available cursos. */
      context.dispatch(
        "RetrieveUserCursosByNumeroEstudante",
        context.state.loggedUser.id
      );
      context.dispatch(
        "RetrieveUserAvailableCursosByNumeroEstudante",
        context.state.loggedUser.id
      );
    },
    async RemoveAlumniLoggedLinkById(context, linkId) {
      await UserService.removeAlumniLinkById(context.state.loggedUser, linkId);

      /* Trigar o update dos user links e dos available links. */
      context.dispatch(
        "RetrieveUserLinksByNumeroEstudante",
        context.state.loggedUser.id
      );
      context.dispatch(
        "RetrieveUserAvailableLinksByNumeroEstudante",
        context.state.loggedUser.id
      );
    },
    async AdicionarAlumniLoggedLinkById(context, link) {
      await UserService.addAlumniLinkById(
        context.state.loggedUser,
        link.id_links,
        link.url
      );

      /* Trigar o update dos user links e dos available links. */
      context.dispatch(
        "RetrieveUserLinksByNumeroEstudante",
        context.state.loggedUser.id
      );
      context.dispatch(
        "RetrieveUserAvailableLinksByNumeroEstudante",
        context.state.loggedUser.id
      );
    },
    async RetrieveAllAlumniInformation(context, filtros) {
      let data = await UserService.fetchAllAlumni(
        GetLoggedUser(context.state),
        filtros
      );

      context.commit("ALL_ALUMNI_INFORMATION", JSON.parse(data));
    },
    async RetrieveUserInformationByNumeroEstudante(context, numeroEstudante) {
      let data = await UserService.fetchAlumniById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_INFORMATION_BY_ID", JSON.parse(data));
    },
    async RetrieveLoggedAlumniInformation(context) {
      if (context.state.loggedUser !== null) {
        let data = await UserService.fetchAlumniById(
          context.state.loggedUser,
          context.state.loggedUser.id
        );

        context.commit("LOGGED_ALUMNI_INFORMATION", JSON.parse(data));
      }
    },
    async RetrieveUserAvailableCursosByNumeroEstudante(
      context,
      numeroEstudante
    ) {
      let data = await CursoService.fetchAlumniAvailableCursosById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_AVAILABLE_CURSOS_BY_ID", JSON.parse(data));
    },
    async RetrieveUserAvailableLinksByNumeroEstudante(
      context,
      numeroEstudante
    ) {
      let data = await LinkService.fetchAlumniAvailableLinksById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_AVAILABLE_LINKS_BY_ID", JSON.parse(data));
    },
    async RetrieveUserLinksByNumeroEstudante(context, numeroEstudante) {
      let data = await UserService.fetchAlumniLinksById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_LINKS_BY_ID", JSON.parse(data));
    },
    async RetrieveUserCursosByNumeroEstudante(context, numeroEstudante) {
      let data = await UserService.fetchAlumniCursosById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_CURSOS_BY_ID", JSON.parse(data));
    },
    async RetrieveUserToolsByNumeroEstudante(context, numeroEstudante) {
      let data = await UserService.fetchAlumniToolsById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_TOOLS_BY_ID", JSON.parse(data));
    },
    async RetrieveUserSkillsByNumeroEstudante(context, numeroEstudante) {
      let data = await UserService.fetchAlumniSkillsById(
        context.state.loggedUser,
        numeroEstudante
      );

      context.commit("USER_SKILLS_BY_ID", JSON.parse(data));
    },
    async RetrieveLoggedProfessorInformation(context) {
      if (context.state.loggedProfessor !== null) {
        let data = await UserService.fetchProfessorById(
          context.state.loggedProfessor,
          context.state.loggedProfessor.id
        );

        context.commit("LOGGED_PROFESSOR_INFORMATION", JSON.parse(data));
      }
    },
    async loginAlumni(context, alumniCredentials) {
      let data = await AuthService.loginAlumni(alumniCredentials);

      context.commit("LOGIN_USER", data);

      if (data !== null) {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(context.state.loggedUser)
        );
        localStorage.removeItem("loggedProfessor");
        context.dispatch("RetrieveLoggedAlumniInformation");
      }
    },
    async loginProfessor(context, professorCredentials) {
      let data = await AuthService.loginProfessor(professorCredentials);

      context.commit("LOGIN_PROFESSOR", data);

      if (data !== null) {
        localStorage.setItem(
          "loggedProfessor",
          JSON.stringify(context.state.loggedProfessor)
        );
        localStorage.removeItem("loggedUser");
        context.dispatch("RetrieveLoggedProfessorInformation");
      }
    },
    async logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("loggedProfessor");
      localStorage.removeItem("loggedUser");
    },
    async register(context, payload) {
      await AuthService.register(payload);
    },
    async EditarLoggedAlumni(context, alumni) {
      await UserService.updateAlumniById(GetLoggedUser(context.state), alumni);
    },

    async fetchAllTestimonies(context){
      let data = await TestimonyService.getAllTestimonies();
      context.commit("SET_TESTIMONIES", JSON.parse(data))
    },

    saveBolsa(context, bolsa) {
      context.commit("SAVE_BOLSA", bolsa);
    },
    setActiveBolsa(context, bolsa) {
      context.commit("SET_ACTIVE_BOLSA", bolsa);
    },
    editBolsa(context, bolsa) {
      context.commit("EDIT_BOLSA", bolsa);
    },
    deleteBolsa(context, id) {
      context.commit("REMOVE_BOLSA", id);
    },
    createCompany(context, company) {
      context.commit("CREATE_COMPANY", company);
    },
    setActiveCompany(context, company) {
      context.commit("SET_ACTIVE_COMPANY", company);
    },
    editCompany(context, company) {
      context.commit("EDIT_COMPANY", company);
    },
    deleteCompany(context, id) {
      context.commit("DELETE_COMPANY", id);
    },
    saveTestimony(context, testimony) {
      context.commit("SAVE_TESTIMONY", testimony);
    },
    createEvent(context, event) {
      context.commit("SAVE_EVENT", event);
    },
    setActiveEvent(context, event) {
      context.commit("SET_ACTIVE_EVENT", event);
    },
    deleteEvent(context, event) {
      context.commit("DELETE_EVENT", event);
    },
    editEvent(context, event) {
      context.commit("EDIT_EVENT", event);
    }
  },
  mutations: {
    ALL_ALUMNI_INFORMATION(state, data) {
      state.alumnis = data;
    },
    USER_INFORMATION_BY_ID(state, data) {
      state.userInformationByNumeroEstudante = data;
    },
    USER_AVAILABLE_CURSOS_BY_ID(state, data) {
      state.userAvailableCursos = data;
    },
    USER_AVAILABLE_LINKS_BY_ID(state, data) {
      state.userAvailableLinks = data;
    },
    USER_LINKS_BY_ID(state, data) {
      state.userLinks = data;
    },
    USER_CURSOS_BY_ID(state, data) {
      state.userCursos = data;
    },
    USER_TOOLS_BY_ID(state, data) {
      state.userTools = data;
    },
    USER_SKILLS_BY_ID(state, data) {
      state.userSkills = data;
    },
    LOGGED_ALUMNI_INFORMATION(state, data) {
      state.loggedAlumniInformation = data;
    },
    LOGGED_PROFESSOR_INFORMATION(state, data) {
      state.loggedProfessorInformation = data;
    },
    LOGIN_PROFESSOR(state, professor) {
      state.loggedProfessor = JSON.parse(professor);
      state.loggedUser = null;
    },
    LOGIN_USER(state, alumni) {
      state.loggedUser = JSON.parse(alumni);
      state.loggedProfessor = null;
    },
    LOGOUT(state) {
      state.loggedUser = null;
      state.loggedProfessor = null;
    },
    SAVE_BOLSA(state, bolsa) {
      state.bolsas.push(bolsa);
      localStorage.setItem("bolsas", JSON.stringify(state.bolsas));
    },
    REMOVE_BOLSA(state, id) {
      state.bolsas = state.bolsas.filter(bolsa => bolsa.id != id);

      localStorage.setItem("bolsas", JSON.stringify(state.bolsas));
    },
    SET_ACTIVE_BOLSA(state, bolsa) {
      state.activeBolsa = bolsa;
    },
    EDIT_BOLSA(state, bolsa) {
      state.bolsas = state.bolsas.filter(b => b.id != bolsa.id);
      state.bolsas.push(bolsa);
      localStorage.setItem("bolsas", JSON.stringify(state.bolsas));
    },

    CREATE_COMPANY(state, company) {
      state.companies.push(company);
      localStorage.setItem("companies", JSON.stringify(state.companies));
    },
    DELETE_COMPANY(state, id) {
      state.companies = state.companies.filter(
        company => company.id_company != id
      );

      localStorage.setItem("companies", JSON.stringify(state.companies));
    },
    SET_ACTIVE_COMPANY(state, company) {
      state.activeCompany = company;
    },
    EDIT_COMPANY(state, company) {
      state.companies = state.companies.filter(
        c => c.id_company != company.id_company
      );
      state.companies.push(company);
      localStorage.setItem("companies", JSON.stringify(state.companies));
    },

    SET_TESTIMONIES(state,testimonies){
      state.testimonies = (testimonies)
    },

    SAVE_EVENT(state, event) {
      state.events.push(event);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    SET_ACTIVE_EVENT(state, event) {
      state.activeEvent = event;
    },
    DELETE_EVENT(state, event) {
      state.events = state.events.filter(object => object != event);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    EDIT_EVENT(state, event) {
      state.events = state.events.filter(e => e.id != event.id);
      state.events.push(event);
      localStorage.setItem("events", JSON.stringify(state.events));
    }
  }
});
