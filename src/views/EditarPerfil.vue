<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  v-if="
                    this.$store.getters.getLoggedUser.genero === 'Masculino'
                  "
                  src="@/assets/img/usersFoto/homem.jpg"
                  alt="Admin"
                  class="rounded-circle"
                  width="150"
                />
                <img
                  v-else
                  src="@/assets/img/usersFoto/mulher.jpg"
                  alt="Admin"
                  class="rounded-circle"
                  width="150"
                />
                <div class="mt-3">
                  <h4>{{ this.$store.getters.getLoggedUser.nome }}</h4>
                  <textarea
                    class="form-control"
                    v-model="editarData.descricao"
                    rows="3"
                  ></textarea>
                  <button
                    v-on:click="editar"
                    class="btn btn-outline-primary pull-rigth"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <button
              v-if="getLinksAvailableForUser.length > 0"
              class="btn"
              style="margin-top:-8px;"
              @click="modal.usersLinksModal = true"
            >
              Add +
            </button>

            <LinkModal
              @close="modal.usersLinksModal = false"
              :showModal="modal.usersLinksModal"
              modalTitle="Adicionar Links"
              :links="getLinksAvailableForUser"
            ></LinkModal>

            <ul class="list-group list-group-flush">
              <li
                v-for="(link, index) in editarData.editUsersLinks[0].links"
                v-bind:key="index"
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <button
                    style="margin-top:-5px;width:5px;"
                    class="p-2 btn"
                    v-on:click="RemoveLink(link.title)"
                  >
                    x
                  </button>
                  {{ link.title }}
                </h6>
                <a class="text-secondary" :href="link.href">
                  {{ LimitNumberCharsLinkSize(link.href) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Numero de Estudante</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.$store.getters.getLoggedUser.numeroEstudante }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.$store.getters.getLoggedUser.email }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Telemóvel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input
                    class="mb-4"
                    type="text"
                    v-model="editarData.telemovel"
                  />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Data Nacimento</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.$store.getters.getLoggedUser.data_Nasc }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Morada</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" v-model="editarData.morada" />
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2">Cursos</i>
                  </h6>
                </div>
                <div>
                  <button
                    v-if="getCursosAvailableForUser.length > 0"
                    class="btn"
                    style="margin-top:-8px;"
                    @click="modal.usersCursosHistoricoModal = true"
                  >
                    Add +
                  </button>
                </div>
              </div>

              <CursoModal
                @close="modal.usersCursosHistoricoModal = false"
                :showModal="modal.usersCursosHistoricoModal"
                modalTitle="Adicionar Cursos"
                :cursos="getCursosAvailableForUser"
              ></CursoModal>

              <div
                v-for="(cursoHistorico, index) in editarData
                  .editUsersCursosHistorico[0].cursos"
                v-bind:key="index"
              >
                <div class="row">
                  <div class="col-sm-1">
                    <button
                      style="margin-top:-10px;width:5px;"
                      class="p-2 btn"
                      v-on:click="RemoveCurso(cursoHistorico.title)"
                    >
                      x
                    </button>
                  </div>
                  <div class="col-sm-9">
                    <h6 class="mb-0">{{ cursoHistorico.title }}</h6>
                  </div>
                  <div class="col-sm-2 text-secondary">
                    {{ cursoHistorico.year }}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>

          <div class="row gutters-sm">
            <div class="col-sm-6 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="d-flex align-items-center mb-3">
                        <i class="material-icons text-info mr-2"
                          >Experiência / Skills</i
                        >
                      </h6>
                    </div>
                    <div>
                      <button
                        v-if="getSkillsAvailableForUser.length > 0"
                        class="btn"
                        style="margin-top:-8px;"
                        @click="modal.userSkillsModal = true"
                      >
                        Add +
                      </button>
                    </div>
                  </div>

                  <CompetenceModal
                    @close="modal.userSkillsModal = false"
                    :showModal="modal.userSkillsModal"
                    modalTitle="Adicionar Skills"
                    type="skill"
                    :competences="getSkillsAvailableForUser"
                  ></CompetenceModal>

                  <div
                    v-for="(skill, index) in editarData.editUsersSkills[0]
                      .skills"
                    :key="index"
                  >
                    <Competence
                      :title="skill.title"
                      :originalPercentagem="skill.percentagem"
                      type="skill"
                      v-bind:edit="true"
                    ></Competence>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="d-flex align-items-center mb-3">
                        <i class="material-icons text-info mr-2"
                          >Dominio de Ferramentas</i
                        >
                      </h6>
                    </div>
                    <div>
                      <button
                        v-if="getToolsAvailableForUser.length > 0"
                        class="btn"
                        style="margin-top:-8px;"
                        @click="modal.userToolsModal = true"
                      >
                        Add +
                      </button>
                    </div>
                  </div>

                  <CompetenceModal
                    @close="modal.userToolsModal = false"
                    :showModal="modal.userToolsModal"
                    modalTitle="Adicionar Tools"
                    type="tool"
                    :competences="getToolsAvailableForUser"
                  ></CompetenceModal>

                  <div
                    v-for="(tool, index) in editarData.editUsersSkills[0].tools"
                    :key="index"
                  >
                    <Competence
                      :title="tool.title"
                      :originalPercentagem="tool.percentagem"
                      type="tool"
                      v-bind:edit="true"
                    ></Competence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Competence from "../components/Competence";
import CompetenceModal from "../components/CompetenceModal";
import CursoModal from "../components/CursoModal";
import LinkModal from "../components/LinkModal";

export default {
  name: "EditarPerfil",
  components: {
    Competence,
    CompetenceModal,
    CursoModal,
    LinkModal
  },
  data() {
    return {
      editarData: {
        morada: this.$store.getters.getLoggedUser.morada,
        telemovel: this.$store.getters.getLoggedUser.telemovel,
        descricao: this.$store.getters.getLoggedUser.descricao,
        editUsersSkills: [],
        editUsersCursosHistorico: [],
        editUsersLinks: []
      },
      modal: {
        userToolsModal: false,
        userSkillsModal: false,
        usersCursosHistoricoModal: false,
        usersLinksModal: false
      }
    };
  },
  created: function() {
    this.editarData.editUsersSkills = this.$store.getters.getUserSkillsByNumeroEstudante(
      this.$store.getters.getLoggedUser.numeroEstudante
    );
    this.editarData.editUsersCursosHistorico = this.$store.getters.getUsersCursosHistoricoByNumeroEstudante(
      this.$store.getters.getLoggedUser.numeroEstudante
    );

    this.editarData.editUsersLinks = this.$store.getters.getUsersLinksByNumeroEstudante(
      this.$store.getters.getLoggedUser.numeroEstudante
    );
  },
  computed: {
    getLinksAvailableForUser() {
      let allLinksAvailable = this.$store.getters.getLinksAvailable;
      let linksUserHasAlready = this.editarData.editUsersLinks[0].links;
      return allLinksAvailable.filter(function(link) {
        return !linksUserHasAlready.some(
          linkUserHas => linkUserHas.title === link.title
        );
      });
    },
    getCursosAvailableForUser() {
      let allCursosAvailable = this.$store.getters.getCursosAvailable;
      let cursosUserHasAlready = this.editarData.editUsersCursosHistorico[0]
        .cursos;
      return allCursosAvailable.filter(function(curso) {
        return !cursosUserHasAlready.some(
          cursoUserHas => cursoUserHas.title === curso.title
        );
      });
    },
    getSkillsAvailableForUser() {
      let allSkillsAvailable = this.$store.getters.getSkillsAvailable;
      let skillsUserHas = this.editarData.editUsersSkills[0].skills;
      return allSkillsAvailable.filter(function(skill) {
        return !skillsUserHas.some(
          skillUser => skillUser.title === skill.title
        );
      });
    },
    getToolsAvailableForUser() {
      let allToolsAvailable = this.$store.getters.getToolsAvailable;
      let toolsUserHas = this.editarData.editUsersSkills[0].tools;
      return allToolsAvailable.filter(function(tool) {
        return !toolsUserHas.some(toolUser => toolUser.title === tool.title);
      });
    }
  },
  methods: {
    RemoveLink(linkTitle) {
      this.editarData.editUsersLinks[0].links = this.editarData.editUsersLinks[0].links.filter(
        link => link.title != linkTitle
      );
      console.log("RemoveLink: " + linkTitle);
    },
    AddLink(title, href) {
      this.editarData.editUsersLinks[0].links.push({
        title: title,
        href: href
      });
      console.log("AddLink: " + title + "  " + href);
    },

    RemoveCurso(cursoTitle) {
      this.editarData.editUsersCursosHistorico[0].cursos = this.editarData.editUsersCursosHistorico[0].cursos.filter(
        curso => curso.title != cursoTitle
      );
    },
    AddCurso(title, year) {
      this.editarData.editUsersCursosHistorico[0].cursos.push({
        title: title,
        year: year
      });
      console.log("AddCurso: " + title + "  " + year);
    },
    competenceNew(title, type, percentagem) {
      if (type === "tool") {
        this.editarData.editUsersSkills[0].tools.push({
          title: title,
          percentagem: percentagem
        });
      } else if (type === "skill") {
        this.editarData.editUsersSkills[0].skills.push({
          title: title,
          percentagem: percentagem
        });
      } else {
        console.log("Tipo não está bem. Não fazer nada.");
      }
      console.log("competenceNew: " + title + "  " + type + "  " + percentagem);
    },
    competenceDeleted(title, type) {
      if (type === "tool") {
        this.editarData.editUsersSkills[0].tools = this.editarData.editUsersSkills[0].tools.filter(
          tool => tool.title != title
        );
      } else if (type === "skill") {
        this.editarData.editUsersSkills[0].skills = this.editarData.editUsersSkills[0].skills.filter(
          skill => skill.title != title
        );
      } else {
        console.log("Tipo não está bem. Não fazer nada.");
      }
      console.log("competenceDeleted" + title + "  " + type);
    },
    competenceChanged(title, type, percentagem) {
      if (type === "tool") {
        this.editarData.editUsersSkills[0].tools.map(function(tool) {
          if (tool.title === title) {
            tool.percentagem = percentagem;
          }
          return tool;
        });
      } else if (type === "skill") {
        this.editarData.editUsersSkills[0].skills.map(function(skill) {
          if (skill.title === title) {
            skill.percentagem = percentagem;
          }
          return skill;
        });
      } else {
        console.log("Tipo não está bem. Não fazer nada.");
      }
      console.log(
        "competenceChanged" + title + "  " + type + "  " + percentagem
      );
    },
    LimitNumberCharsLinkSize(link) {
      if (link.length > 15) {
        link = link.substr(0, 15) + "...";
      }
      return link;
    },
    editar() {
      try {
        /* Chamar a ação disponivel no store */
        this.$store.dispatch("editar", this.$data.editarData);

        /* Se o editar falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o perfil não vai ser executado */
        this.$router.push({
          name: "Perfil",
          params: {
            numeroEstudante: this.$store.getters.getLoggedUser.numeroEstudante
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
