<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <template
          v-if="isLoggedAlumni === true && loggedAlumniInformation !== null"
        >
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
                    <router-link
                      v-if="
                        loggedAlumniInformation.id_nroEstudante ===
                          userInformationByNumeroEstudante.id_nroEstudante
                      "
                      class="btn btn-outline-warning btn-sm"
                      style="margin-left:10px;"
                      id="editarPerfil"
                      :to="{ name: 'EditarPerfil' }"
                      >Editar Perfil</router-link
                    >
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
                    <router-link
                      v-if="
                        loggedAlumniInformation.id_nroEstudante ===
                          userInformationByNumeroEstudante.id_nroEstudante
                      "
                      id="editarPortefolio"
                      class="btn btn-outline-warning btn-sm"
                      style="margin-left:10px;"
                      :to="{ name: 'EditarPortefolio' }"
                      >Editar</router-link
                    >
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
                    <router-link
                      v-if="
                        loggedAlumniInformation.id_nroEstudante ===
                          userInformationByNumeroEstudante.id_nroEstudante
                      "
                      class="btn btn-outline-warning btn-sm"
                      style="margin-left:10px;"
                      :to="{ name: 'EditarCursos' }"
                      >Editar</router-link
                    >
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
                    <div class="d-flex justify-content-between">
                      <div style="margin-top:7px;">
                        <h6 class="d-flex align-items-center mb-3">
                          <i class="material-icons text-info mr-2"
                            >Experiência / Skills</i
                          >
                        </h6>
                      </div>
                      <div>
                        <router-link
                          v-if="
                            loggedAlumniInformation.id_nroEstudante ===
                              userInformationByNumeroEstudante.id_nroEstudante
                          "
                          class="btn btn-outline-warning btn-sm"
                          style="margin-left:10px;"
                          id="editarSkill"
                          :to="{ name: 'EditarSkills' }"
                          >Editar</router-link
                        >
                      </div>
                    </div>

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
                    <div class="d-flex justify-content-between">
                      <div style="margin-top:7px;">
                        <h6 class="d-flex align-items-center mb-3">
                          <i class="material-icons text-info mr-2"
                            >Exp. de Ferramentas</i
                          >
                        </h6>
                      </div>
                      <div>
                        <router-link
                          v-if="
                            loggedAlumniInformation.id_nroEstudante ===
                              userInformationByNumeroEstudante.id_nroEstudante
                          "
                          class="btn btn-outline-warning btn-sm"
                          style="margin-left:10px;"
                          :to="{ name: 'EditarTools' }"
                          >Editar</router-link
                        >
                      </div>
                    </div>

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
export default {
  name: "Perfil",
  components: {
    Competence
  },
  created() {
    this.PrepareAsyncData(this.$route.params.numeroEstudante);
  },
  watch: {
    "$route.params.numeroEstudante": function(numeroEstudante) {
      this.PrepareAsyncData(numeroEstudante);
    }
  },
  computed: {
    ...mapGetters({
      loggedAlumniInformation: "getLoggedAlumniInformation",
      userInformationByNumeroEstudante: "getUserInformationByNumeroEstudante",
      userSkillsByNumeroEstudante: "getUserSkillsByNumeroEstudante",
      userToolsByNumeroEstudante: "getUserToolsByNumeroEstudante",
      userLinksByNumeroEstudante: "getUserLinksByNumeroEstudante",
      userCursosByNumeroEstudante: "getUserCursosByNumeroEstudante",
      isLoggedAlumni: "isLoggedAlumni"
    })
  },
  methods: {
    async PrepareAsyncData(numeroEstudante) {
      await this.$store.dispatch(
        "RetrieveUserInformationByNumeroEstudante",
        parseInt(numeroEstudante)
      );
      await this.$store.dispatch("RetrieveLoggedUserInformation");
      await this.$store.dispatch(
        "RetrieveUserSkillsByNumeroEstudante",
        parseInt(numeroEstudante)
      );
      await this.$store.dispatch(
        "RetrieveUserToolsByNumeroEstudante",
        parseInt(numeroEstudante)
      );
      await this.$store.dispatch(
        "RetrieveUserLinksByNumeroEstudante",
        parseInt(numeroEstudante)
      );
      await this.$store.dispatch(
        "RetrieveUserCursosByNumeroEstudante",
        parseInt(numeroEstudante)
      );
    },
    LimitNumberCharsLinkSize(link) {
      if (link.length > 15) {
        link = link.substr(0, 15) + "...";
      }
      return link;
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
