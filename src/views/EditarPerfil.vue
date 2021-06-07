<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <template v-if="isLoggedUser === true">
          <div class="col-lg-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    v-if="userInformationByNumeroEstudante.id_genero === '1'"
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
                    <textarea
                      class="form-control"
                      v-model="editarData.descricao"
                      id="textArea"
                      rows="3"
                    ></textarea>

                    <button
                      class="btn btn-outline-primary btn-sm"
                      style="margin-left:10px;"
                      v-on:click="editar"
                    >
                      Guardar
                    </button>
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
                    <input type="text" v-model="editarData.morada" />
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

export default {
  name: "EditarPerfil",
  components: {
    Competence
  },
  data() {
    return {
      editarData: {
        morada: "",
        telemovel: "",
        descricao: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      loggedAlumniInformation: "getLoggedAlumniInformation",
      userInformationByNumeroEstudante: "getUserInformationByNumeroEstudante",
      userSkillsByNumeroEstudante: "getUserSkillsByNumeroEstudante",
      userToolsByNumeroEstudante: "getUserToolsByNumeroEstudante",
      userLinksByNumeroEstudante: "getUserLinksByNumeroEstudante",
      userCursosByNumeroEstudante: "getUserCursosByNumeroEstudante",
      isLoggedUser: "isLoggedUser"
    })
  },
  created: function() {
    this.PrepareAsyncData();
  },
  methods: {
    async PrepareAsyncData() {
      await this.$store.dispatch(
        "RetrieveUserInformationByNumeroEstudante",
        parseInt(this.$store.getters.getLoggedUser.id)
      );
      await this.$store.dispatch("RetrieveLoggedAlumniInformation");
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

      this.editarData.morada = this.$store.getters.getUserInformationByNumeroEstudante.morada;
      this.editarData.telemovel = this.$store.getters.getUserInformationByNumeroEstudante.telemovel;
      this.editarData.descricao = this.$store.getters.getUserInformationByNumeroEstudante.descricao;
    },

    LimitNumberCharsLinkSize(link) {
      if (link.length > 15) {
        link = link.substr(0, 15) + "...";
      }
      return link;
    },
    async editar() {
      try {
        /* Chamar a ação disponivel no store */
        const alumni = {
          morada: this.editarData.morada,
          telemovel: this.editarData.telemovel,
          descricao: this.editarData.descricao
        };

        await this.$store.dispatch("EditarLoggedAlumni", alumni);

        /* Se o editar falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o perfil não vai ser executado */
        this.$router.push({
          name: "Perfil",
          params: {
            numeroEstudante: this.$store.getters.getLoggedUser.id
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
