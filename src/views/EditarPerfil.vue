<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  class="rounded-circle"
                  width="150"
                />
                <div class="mt-3">
                  <h4>{{ this.$store.getters.getLoggedUser.nome }}</h4>
                  <p class="text-secondary mb-1">Licensiado em Multimédia</p>
                  <p class="text-muted font-size-sm"></p>
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
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <img
                    class="icon_perfil"
                    src="https://images.vexels.com/media/users/3/205387/isolated/preview/9e5a4a16e78a187fc3e47fc6e2c5f03a-internet-website-icon-stroke-by-vexels.png"
                  />
                  Website
                </h6>
                <span class="text-secondary">"TODO"</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-github mr-2 icon-inline"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    ></path></svg
                  >Github
                </h6>
                <span class="text-secondary">"TODO"</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-twitter mr-2 icon-inline text-info"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    ></path></svg
                  >Twitter
                </h6>
                <span class="text-secondary">"TODO"</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-instagram mr-2 icon-inline text-danger"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    ></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg
                  >Instagram
                </h6>
                <span class="text-secondary">"TODO"</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <h6 class="mb-0">
                  <img
                    class="icon_perfil"
                    src="https://i.pinimg.com/originals/1b/60/f9/1b60f9d42fd84e31b304d5e7779cccfd.png"
                  />Facebook
                </h6>
                <span class="text-secondary">"TODO"</span>
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
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Sobre Mim</h6>
                </div>
                <div class="col-sm-9 text-secondary text-justify">
                  <textarea
                    class="form-control"
                    v-model="editarData.descricao"
                    rows="3"
                  ></textarea>
                </div>
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

export default {
  name: "EditarPerfil",
  components: {
    Competence,
    CompetenceModal
  },
  data() {
    return {
      editarData: {
        morada: this.$store.getters.getLoggedUser.morada,
        telemovel: this.$store.getters.getLoggedUser.telemovel,
        descricao: this.$store.getters.getLoggedUser.descricao,
        editUsersSkills: []
      },
      modal: {
        userToolsModal: false,
        userSkillsModal: false
      }
    };
  },
  created: function() {
    this.editarData.editUsersSkills = this.$store.getters.getLoggedUserSkills;
  },
  computed: {
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
    editar() {
      try {
        /* Chamar a ação disponivel no store */
        this.$store.dispatch("editar", this.$data.editarData);

        /* Se o editar falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o perfil não vai ser executado */
        this.$router.push({ name: "Perfil" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
