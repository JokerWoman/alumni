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
                  alt="foto de um homem"
                  class="rounded-circle"
                  width="150"
                  height="150"
                />
                <img
                  v-else
                  src="@/assets/img/usersFoto/mulher.jpg"
                  alt="foto de uma mulher"
                  class="rounded-circle"
                  width="150"
                  height="150"
                />
                <div class="mt-3">
                  <h1 style="font-size: 25px">{{ this.$store.getters.getLoggedUser.nome }}</h1>
                  <div class="col-sm-12 text-secondary text-justify">
                    {{ this.$store.getters.getLoggedUser.descricao }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div style="margin-top:7px;">
                  <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2">Portefolio</i>
                  </h6>
                </div>
                <div>
                  <button
                    v-if="getLinksAvailableForUser.length > 0"
                    @click="modal.usersLinksModal = true"
                    class="btn btn-outline-primary btn-sm"
                    id="addPortfolio"
                  >
                    Adicionar
                  </button>

                  <button
                    style="margin-left:5px;"
                    v-on:click="editar"
                    class="btn btn-outline-primary btn-sm"
                  >
                    Guardar
                  </button>
                </div>
              </div>

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
                      style="margin-top:-5px;margin-left:-25px;margin-right:20px;width:5px;"
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
                  {{ this.$store.getters.getLoggedUser.telemovel }}
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
                  {{ this.$store.getters.getLoggedUser.morada }}
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2">Cursos</i>
                  </h6>
                </div>
              </div>
              <div
                v-for="(cursoHistorico, index) in editarData
                  .editUsersCursosHistorico[0].cursos"
                v-bind:key="index"
              >
                <div class="row">
                  <div class="col-sm-10">
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
                  <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2"
                      >Experiência / Skills</i
                    >
                  </h6>

                  <div
                    v-for="(skill, index) in editarData.editUsersSkills[0]
                      .skills"
                    :key="index"
                  >
                    <Competence
                      :title="skill.title"
                      :originalPercentagem="skill.percentagem"
                      type="skill"
                      v-bind:edit="false"
                    ></Competence>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2"
                      >Exp. de Ferramentas</i
                    >
                  </h6>

                  <div
                    v-for="(tool, index) in editarData.editUsersTools[0].tools"
                    :key="index"
                  >
                    <Competence
                      :title="tool.title"
                      :originalPercentagem="tool.percentagem"
                      type="tool"
                      v-bind:edit="false"
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
import LinkModal from "../components/LinkModal";

export default {
  name: "EditarPortefolio",
  components: {
    Competence,
    LinkModal
  },
  data() {
    return {
      editarData: {
        morada: this.$store.getters.getLoggedUser.morada,
        telemovel: this.$store.getters.getLoggedUser.telemovel,
        descricao: this.$store.getters.getLoggedUser.descricao,
        editUsersSkills: [],
        editUsersTools: [],
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
    this.editarData.editUsersTools = this.$store.getters.getUserToolsByNumeroEstudante(
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
