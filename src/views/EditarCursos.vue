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
                </div>

                <ul class="list-group list-group-flush">
                  <template v-if="userLinksByNumeroEstudante !== null">
                    <li
                      v-for="(link, index) in userLinksByNumeroEstudante"
                      v-bind:key="index"
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ link.tipoLink }}
                      </h6>
                      <a
                        class="text-secondary"
                        target="_blank"
                        :href="link.link"
                      >
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
                <div class="d-flex justify-content-between">
                  <div style="margin-top:7px;">
                    <h6 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info mr-2">Cursos</i>
                    </h6>
                  </div>
                  <div>
                    <button
                      v-if="userAvailableCursosByNumeroEstudante.length > 0"
                      @click="modal.usersCursosHistoricoModal = true"
                      class="btn btn-outline-warning btn-sm"
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

                <CursoModal
                  @close="modal.usersCursosHistoricoModal = false"
                  :showModal="modal.usersCursosHistoricoModal"
                  modalTitle="Adicionar Cursos"
                  :cursos="userAvailableCursosByNumeroEstudante"
                ></CursoModal>

                <template v-if="userCursosByNumeroEstudante !== null">
                  <div
                    v-for="(curso, index) in userCursosByNumeroEstudante"
                    v-bind:key="index"
                  >
                    <div class="row">
                      <div class="col-sm-1">
                        <button
                          style="margin-top:-10px;width:5px;"
                          class="p-2 btn"
                          v-on:click="RemoveCurso(curso.id_cursos)"
                        >
                          x
                        </button>
                      </div>
                      <div class="col-sm-9">
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
import CursoModal from "../components/CursoModal";

export default {
  name: "EditarCursos",
  components: {
    Competence,
    CursoModal
  },
  data() {
    return {
      modal: {
        usersCursosHistoricoModal: false
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
      userAvailableCursosByNumeroEstudante:
        "getUserAvailableCursosByNumeroEstudante",
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
        "RetrieveUserAvailableCursosByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
    },
    async RemoveCurso(cursoId) {
      await this.$store.dispatch("RemoveAlumniLoggedCursoById", cursoId);

      console.log("Remove Curso: " + cursoId);
    },
    async AddCurso(cursoId, anoCurso) {
      await this.$store.dispatch("AdicionarAlumniLoggedCursoById", {
        id_cursos: cursoId,
        anoCurso: anoCurso
      });

      console.log("Add Curso: " + cursoId + "  " + anoCurso);
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
