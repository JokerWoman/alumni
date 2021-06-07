import Vue from "vue";
import Vuex from "vuex";

//import { UserService } from '@/services/user.service';
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";

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
        alumnis: localStorage.getItem("alumnis") ?
            JSON.parse(localStorage.getItem("alumnis")) :
            [],
        usersSkills: localStorage.getItem("usersSkills") ?
            JSON.parse(localStorage.getItem("usersSkills")) :
            [],
        usersTools: localStorage.getItem("usersTools") ?
            JSON.parse(localStorage.getItem("usersTools")) :
            [],
        usersCursosHistorico: localStorage.getItem("usersCursosHistorico") ?
            JSON.parse(localStorage.getItem("usersCursosHistorico")) :
            [],
        usersLinks: localStorage.getItem("usersLinks") ?
            JSON.parse(localStorage.getItem("usersLinks")) :
            [],
        usersNetwork: localStorage.getItem("usersNetwork") ?
            JSON.parse(localStorage.getItem("usersNetwork")) :
            [],
        cursos: localStorage.getItem("cursos") ?
            JSON.parse(localStorage.getItem("cursos")) :
            [
                { title: "Licenciatura em Fotografia" },
                { title: "Licenciatura em Multimédia" },
                {
                    title: "Licenciatura em Tecnologia e Sistemas de Informação para a Web"
                },
                { title: "Mestrado em Design" },
                { title: "Mestrado em Sistemas e Media Interativos" }
            ],
        links: localStorage.getItem("links") ?
            JSON.parse(localStorage.getItem("links")) :
            [
                { title: "Github" },
                { title: "Website" },
                { title: "LinkedIn" },
                { title: "Behance" }
            ],
        skills: localStorage.getItem("skills") ?
            JSON.parse(localStorage.getItem("skills")) :
            [
                { title: "Web Design" },
                { title: "Programação C#" },
                { title: "Fotografia" },
                { title: "UI/UX Development" },
                { title: "Javascript" }
            ],
        tools: localStorage.getItem("tools") ?
            JSON.parse(localStorage.getItem("tools")) :
            [
                { title: "Adobe Illustrator" },
                { title: "Adobe Photoshop" },
                { title: "Adobe After Effects" },
                { title: "Adobe Premiere" },
                { title: "Adobe XD" }
            ],
        loggedAlumniInformation: "",
        loggedProfessorInformation: "",
        userInformationByNumeroEstudante: "",
        loggedUser: localStorage.getItem("loggedUser") ?
            JSON.parse(localStorage.getItem("loggedUser")) :
            null,
        loggedProfessor: localStorage.getItem("loggedProfessor") ?
            JSON.parse(localStorage.getItem("loggedProfessor")) :
            null,
        bolsas: localStorage.getItem("bolsas") ?
            JSON.parse(localStorage.getItem("bolsas")) :
            [{
                    id: 1,
                    category: 2,
                    description: "Excelente oportunidade de emprego e de enriquecer o vosso CV. Para mais informações, contactar a Blip.",
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
                    description: "A Moxy Studio está a procurar jovens talentos que queiram ingressar no mercado de trabalho. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
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
                    description: "A XDSoftware está a procurar jovens webdesigners. Se fores um deles só tens que responder a esta oferta e nós tratamos do resto!",
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

        companies: localStorage.getItem("companies") ?
            JSON.parse(localStorage.getItem("companies")) :
            [{
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

        testimonys: localStorage.getItem("testimonys") ?
            JSON.parse(localStorage.getItem("testimonys")) :
            [{
                    id: 1,
                    name: "Marco Marques",
                    img: require("@/assets/img/testemunhos/testemunho1.webp"),
                    description: "Adoro o Alumni Esmad! Sem duvida que recomendo."
                },
                {
                    id: 2,
                    name: "Andrea Fernandes",
                    img: require("@/assets/img/testemunhos/testemunho2.webp"),
                    description: "Várias ofertas de emprego incriveis na minha area. Recomendo."
                },
                {
                    id: 3,
                    name: "Carolina Medonsa",
                    img: require("@/assets/img/testemunhos/testemunho3.webp"),
                    description: "Com esta plataforma voltei a ver os meus antigos colegas."
                },
                {
                    id: 4,
                    name: "João Santos",
                    img: require("@/assets/img/testemunhos/testemunho4.webp"),
                    description: "Workshops fantásticos!"
                },
                {
                    id: 5,
                    name: "Ana Martins",
                    img: require("@/assets/img/testemunhos/testemunho5.webp"),
                    description: "Incrivel! Encontrei aqui uma vaga para estágio profissional em breve estarei contratada!"
                }
            ],

        events: localStorage.getItem("events") ?
            JSON.parse(localStorage.getItem("events")) :
            [{
                    id: 1,
                    name: "Plug-IN",
                    type: "workshop",
                    location: { city: "Póvoa de Varzim" },
                    state: "active",
                    date: "2021-06-25",
                    hour: "13:56:00",
                    img: require("@/assets/img/eventos/evento1.webp"),
                    description: "Participa no plug-in, o evento certo para encontrar o emprego certo. Inscreve-te já!"
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
                    description: "A Web Summit é a maior conferência da Europa em tecnologias, realizada anualmente desde 2009. Aparece!"
                }
            ],
        activeEvent: [],

        categories: [{
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
        eventTypes: [{
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
        getToolsAvailable: state =>
            state.tools /* Get de todas as tools que podem ser adicionadas no perfil de um utilizador */ ,

        getCursosAvailable: state =>
            state.cursos /* Get de todos os cursos que podem ser adicionados no perfil de um utilizador */ ,

        AlumniHasCursoByTitle: state => (numeroEstudante, title) => {
            let usersCursosHistorico = state.usersCursosHistorico.filter(
                cursosHistorico =>
                parseInt(cursosHistorico.numeroEstudante) ===
                parseInt(numeroEstudante)
            );

            return usersCursosHistorico[0].cursos.some(
                curso => curso.title === title
            );
        },
        getLinksAvailable: state => state.links,

        getSkillsAvailable: state =>
            state.skills /* Get de todas as skills que podem ser adicionadas no perfil de um utilizador */ ,

        getLoggedUser: state => state.loggedUser,

        isLoggedUser: state => (state.loggedUser === null ? false : true),

        getLoggedAlumniInformation: state => state.loggedAlumniInformation,
        getLoggedProfessorInformation: state => state.loggedProfessorInformation,
        getLoggedProfessor: state => state.loggedProfessor,
        isLoggedProfessor: state => (state.loggedProfessor == null ? false : true),

        getAllAlumniInformation: state => { /* Quando for o professor dar todos, quando alumni filtrar o seu */
            if (state.alumnis !== null) {

                return state.alumnis.filter(alumni => {
                    if (state.loggedUser !== null) /* Quando é o alumnoi então remover o próprio*/ {
                        return parseInt(alumni.id_nroEstudante) !== parseInt(state.loggedUser.id)
                    } else {
                        return true
                    }
                });
            } else {
                return [];
            }
        },
        getUserInformationByNumeroEstudante: state => {
            return state.userInformationByNumeroEstudante;
        },
        getUserSkillsByNumeroEstudante: state => numeroEstudante => {
            /* Get de todas as skills que já estão adicionadas no perfil de um estudante */
            let userSkills = state.usersSkills.filter(
                userSkill =>
                parseInt(userSkill.numeroEstudante) === parseInt(numeroEstudante)
            );
            return userSkills;
        },
        getUserToolsByNumeroEstudante: state => numeroEstudante => {
            /* Get de todas as tools que já estão adicionadas no perfil de um estudante */
            let userTools = state.usersTools.filter(
                userTool =>
                parseInt(userTool.numeroEstudante) === parseInt(numeroEstudante)
            );
            return userTools;
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
        getUsersLinksByNumeroEstudante: state => numeroEstudante => {
            /* Get de todos os cursos que já estão adicionadas no perfil de um estudante */
            let usersLinks = state.usersLinks.filter(
                userLink =>
                parseInt(userLink.numeroEstudante) === parseInt(numeroEstudante)
            );
            return usersLinks;
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

        getCompaniesForSelect: state =>
            state.companies.map(company => ({
                value: company.id_company,
                text: company.name
            })),

        getNextBolsaId: state => {
            return state.bolsas.length > 0 ?
                state.bolsas[state.bolsas.length - 1].id + 1 :
                1;
        },

        getNextCompanyId: state => {
            return state.companies.length > 0 ?
                state.companies[state.companies.length - 1].id_company + 1 :
                1;
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
            const categoryById = state.categories.find(category => category.id === id);
            return categoryById;
        },

        getCompanyById: state => id => {
            const companyById = state.companies.find(company => company.id_company === id);
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
                citys.some(city => city === event.location.city) ?
                    {} :
                    citys.push(event.location.city);
            });

            return citys;
        },

        getNextEventId: state => {
            return state.events.length ?
                state.events[state.events.length - 1].id + 1 :
                {};
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
            const companies = state.companies
            var cards_filtered1 = [];
            for (var bolsa in cards_filtered) {
                for (var company in companies) {
                    if (cards_filtered[bolsa].id_company == companies[company].id_company && companies[company].locality.toUpperCase().includes(locality)) {
                        cards_filtered1.push(cards_filtered[bolsa])
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
            return state.events.find(e => e.id === id);
        },
        getActiveEvent: state => {
            return state.activeEvent;
        }
    },
    actions: {
        async RetrieveAllAlumniInformation(context, filtros) {

            let data = await UserService.fetchAllAlumni(GetLoggedUser(context.state), filtros);

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

                localStorage.setItem("loggedUser", JSON.stringify(context.state.loggedUser));
                localStorage.removeItem("loggedProfessor");
            }
        },
        async loginProfessor(context, professorCredentials) {
            let data = await AuthService.loginProfessor(professorCredentials);

            context.commit("LOGIN_PROFESSOR", data);

            if (data !== null) {
                localStorage.setItem("loggedProfessor", JSON.stringify(context.state.loggedProfessor));
                localStorage.removeItem("loggedUser");
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
        editar(context, payload) {
            /* Editar os dados  */
            context.commit("EDITAR", payload);
            localStorage.setItem("users", JSON.stringify(context.state.users));

            /* Actualizar as skills */
            localStorage.setItem(
                "usersSkills",
                JSON.stringify(context.state.usersSkills)
            );

            /* Actualizar as tools */
            localStorage.setItem(
                "usersTools",
                JSON.stringify(context.state.usersTools)
            );

            /* Actualizar os cursos */
            localStorage.setItem(
                "usersCursosHistorico",
                JSON.stringify(context.state.usersCursosHistorico)
            );

            /* Actualizar os cursos */
            localStorage.setItem(
                "usersLinks",
                JSON.stringify(context.state.usersLinks)
            );

            /* Atualizar o logged user com os novos dados no loggedUser*/
            const user = context.state.users.find(
                user =>
                user.numeroEstudante === context.state.loggedUser.numeroEstudante
            );
            if (user != undefined) {
                //context.commit("LOGIN_USER", user);
                //localStorage.setItem(
                //  "loggedUser",
                //  JSON.stringify(context.state.loggedUser)
                //);
            }
        },
        saveBolsa(context, bolsa) {
            context.commit("SAVE_BOLSA", bolsa);
        },
        setActiveBolsa(context, bolsa) {
            context.commit("SET_ACTIVE_BOLSA", bolsa)
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
            context.commit("SET_ACTIVE_COMPANY", company)
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
        REGISTER(state, user) {
            state.users.push(user);
        },
        REGISTER_SKILLS(state, userSkillData) {
            state.usersSkills.push(userSkillData);
        },
        REGISTER_TOOLS(state, userToolData) {
            state.usersTools.push(userToolData);
        },
        REGISTER_CURSOS(state, userCursoHistoricoData) {
            state.usersCursosHistorico.push(userCursoHistoricoData);
        },
        REGISTER_LINKS(state, userLinksData) {
            state.usersLinks.push(userLinksData);
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

            /* Actualizar skills do utilizador */
            state.usersSkills.map(function(userSkill) {
                if (userSkill.numeroEstudante === state.loggedUser.numeroEstudante) {
                    return {
                        numeroEstudante: state.loggedUser.numeroEstudante,
                        skills: editarPayload.editUsersSkills[0].skills
                    };
                } else {
                    return userSkill;
                }
            });

            /* Actualizar tools do utilizador */
            state.usersTools.map(function(userTool) {
                if (userTool.numeroEstudante === state.loggedUser.numeroEstudante) {
                    return {
                        numeroEstudante: state.loggedUser.numeroEstudante,
                        tools: editarPayload.editUsersTools[0].tools
                    };
                } else {
                    return userTool;
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

            /* Actualizar os links do utilizador */
            state.usersLinks.map(function(userLink) {
                if (userLink.numeroEstudante === state.loggedUser.numeroEstudante) {
                    return {
                        numeroEstudante: state.loggedUser.numeroEstudante,
                        cursos: editarPayload.editUsersLinks[0].links
                    };
                } else {
                    return userLink;
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
            state.companies = state.companies.filter(company => company.id_company != id);

            localStorage.setItem("companies", JSON.stringify(state.companies));
        },
        SET_ACTIVE_COMPANY(state, company) {
            state.activeCompany = company;
        },
        EDIT_COMPANY(state, company) {
            state.companies = state.companies.filter(c => c.id_company != company.id_company);
            state.companies.push(company);
            localStorage.setItem("companies", JSON.stringify(state.companies));
        },

        SAVE_TESTIMONY(state, testimony) {
            state.testimonys.push(testimony);
            localStorage.setItem("testimonys", JSON.stringify(state.testimonys));
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