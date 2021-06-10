<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <template v-if="isLoggedAlumni === true">
          <div class="col-lg-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    v-if="userInformationByNumeroEstudante.id_genero === 1"
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
                    <h1 style="font-size: 25px">
                      {{ userInformationByNumeroEstudante.nome }}
                    </h1>
                    <div class="col-sm-12 text-secondary text-justify">
                      {{ userInformationByNumeroEstudante.descricao }}
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
                      <i class="material-icons text-info mr-2">Portefólio</i>
                    </h6>
                  </div>
                  <div>
                    <button
                      v-if="userAvailableLinksByNumeroEstudante.length > 0"
                      @click="modal.usersLinksModal = true"
                      class="btn btn-outline-warning btn-sm"
                      id="addPortfolio"
                    >
                      Adicionar
                    </button>

                    <button
                      style="margin-left:5px;"
                      v-on:click="editar"
                      class="btn btn-outline-warning btn-sm"
                    >
                      Sair
                    </button>
                  </div>
                </div>

                <LinkModal
                  @close="modal.usersLinksModal = false"
                  :showModal="modal.usersLinksModal"
                  modalTitle="Adicionar Links"
                  :links="userAvailableLinksByNumeroEstudante"
                ></LinkModal>

                <ul class="list-group list-group-flush">
                  <template v-if="userLinksByNumeroEstudante !== null">
                    <li
                      v-for="(link, index) in userLinksByNumeroEstudante"
                      v-bind:key="index"
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        <button
                          style="margin-top:-5px;margin-left:-25px;margin-right:20px;width:5px;"
                          class="p-2 btn"
                          v-on:click="RemoveLink(link.id_links)"
                        >
                          x
                        </button>
                        {{ link.tipoLink }}
                      </h6>
                      <a class="text-secondary" :href="link.link">
                        {{ LimitNumberCharsLinkSize(link.link) }}
                      </a>
                    </li>
                  </template>
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
                    {{ userInformationByNumeroEstudante.id_nroEstudante }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userInformationByNumeroEstudante.email }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Telemóvel</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userInformationByNumeroEstudante.telemovel }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Data Nascimento</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userInformationByNumeroEstudante.dataNascimento }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Morada</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userInformationByNumeroEstudante.morada }}
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
                <template v-if="userCursosByNumeroEstudante !== null">
                  <div
                    v-for="(curso, index) in userCursosByNumeroEstudante"
                    v-bind:key="index"
                  >
                    <div class="row">
                      <div class="col-sm-10">
                        <h6 class="mb-0">{{ curso.tipoCurso }}</h6>
                      </div>
                      <div class="col-sm-2 text-secondary">
                        {{ curso.anoCurso }}
                      </div>
                    </div>
                    <hr />
                  </div>
                </template>
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

                    <template v-if="userSkillsByNumeroEstudante !== null">
                      <div
                        v-for="(skill, index) in userSkillsByNumeroEstudante"
                        :key="index"
                      >
                        <Competence
                          :title="skill.tipoSkill"
                          :originalPercentagem="skill.percentagem"
                          type="skill"
                          v-bind:edit="false"
                        ></Competence>
                      </div>
                    </template>
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

                    <template v-if="userToolsByNumeroEstudante !== null">
                      <div
                        v-for="(tool, index) in userToolsByNumeroEstudante"
                        :key="index"
                      >
                        <Competence
                          :title="tool.tipoTool"
                          :originalPercentagem="tool.percentagem"
                          type="tool"
                          v-bind:edit="false"
                        ></Competence>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      modal: {
        usersLinksModal: false
      }
    };
  },
  created: function() {
    this.PrepareAsyncData();
  },
  computed: {
    ...mapGetters({
      loggedAlumniInformation: "getLoggedAlumniInformation",
      userInformationByNumeroEstudante: "getUserInformationByNumeroEstudante",
      userSkillsByNumeroEstudante: "getUserSkillsByNumeroEstudante",
      userToolsByNumeroEstudante: "getUserToolsByNumeroEstudante",
      userLinksByNumeroEstudante: "getUserLinksByNumeroEstudante",
      userCursosByNumeroEstudante: "getUserCursosByNumeroEstudante",
      userAvailableLinksByNumeroEstudante:
        "getUserAvailableLinksByNumeroEstudante",
      isLoggedAlumni: "isLoggedAlumni"
    })
  },
  methods: {
    async PrepareAsyncData() {
      await this.$store.dispatch(
        "RetrieveUserInformationByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
      await this.$store.dispatch("RetrieveLoggedUserInformation");
      await this.$store.dispatch(
        "RetrieveUserSkillsByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
      await this.$store.dispatch(
        "RetrieveUserToolsByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
      await this.$store.dispatch(
        "RetrieveUserLinksByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
      await this.$store.dispatch(
        "RetrieveUserCursosByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );

      await this.$store.dispatch(
        "RetrieveUserAvailableLinksByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
    },

    async RemoveLink(linkId) {
      await this.$store.dispatch("RemoveAlumniLoggedLinkById", linkId);

      console.log("RemoveLink: " + linkId);
    },
    async AddLink(linkId, linkUrl) {
      await this.$store.dispatch("AdicionarAlumniLoggedLinkById", {
        id_links: linkId,
        url: linkUrl
      });

      console.log("AddLink: " + linkId + "  " + linkUrl);
    },
    LimitNumberCharsLinkSize(link) {
      if (link.length > 15) {
        link = link.substr(0, 15) + "...";
      }
      return link;
    },
    async editar() {
      this.$router.push({
        name: "Perfil",
        params: {
          numeroEstudante: this.$store.getters.getLoggedUser.id
        }
      });
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
