<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  v-if="getUserInfomation.genero === 'Masculino'"
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
                  <h4>{{ getUserInfomation.nome }}</h4>
                  <div class="col-sm-12 text-secondary text-justify">
                    {{ getUserInfomation.descricao }}
                  </div>
                  <template
                    v-if="
                      getUserLoggedInformation.numeroEstudante ===
                        getUserInfomation.numeroEstudante
                    "
                  >
                    <router-link
                      class="btn btn-outline-primary btn-sm"
                      style="margin-left:10px;"
                      :to="{ name: 'EditarPerfil' }"
                      >Editar Perfil</router-link
                    >
                  </template>
                  <template v-else>
                    <template
                      v-if="
                        verifyAlumniInNetwork(
                          getUserInfomation.numeroEstudante
                        ) === true
                      "
                    >
                      <b-button
                        class="btn btn-primary"
                        variant="danger"
                        style="width:180px;"
                        v-on:click="UnFollow(getUserInfomation.numeroEstudante)"
                      >
                        Deixar de seguir
                      </b-button>
                    </template>
                    <template v-else>
                      <button
                        class="btn btn-primary"
                        style="width:180px;"
                        v-on:click="Follow(getUserInfomation.numeroEstudante)"
                      >
                        Seguir
                      </button>
                    </template>
                  </template>
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
                    class="btn btn-outline-primary btn-sm"
                    style="margin-left:10px;"
                    :to="{ name: 'EditarPortefolio' }"
                    >Editar</router-link
                  >
                </div>
              </div>

              <ul class="list-group list-group-flush">
                <li
                  v-for="(link, index) in getUsersLinks[0].links"
                  v-bind:key="index"
                  class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <h6 class="mb-0">
                    {{ link.title }}
                  </h6>
                  <a class="text-secondary" target="_blank" :href="link.href">
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
                  {{ getUserInfomation.numeroEstudante }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ getUserInfomation.email }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Telemóvel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ getUserInfomation.telemovel }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Data Nascimento</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ getUserInfomation.data_Nasc }}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Morada</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ getUserInfomation.morada }}
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
                    class="btn btn-outline-primary btn-sm"
                    style="margin-left:10px;"
                    :to="{ name: 'EditarCursos' }"
                    >Editar</router-link
                  >
                </div>
              </div>

              <div
                v-for="(cursoHistorico, index) in getUsersCursosHistorico[0]
                  .cursos"
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
                        class="btn btn-outline-primary btn-sm"
                        style="margin-left:10px;"
                        :to="{ name: 'EditarSkills' }"
                        >Editar</router-link
                      >
                    </div>
                  </div>

                  <div
                    v-for="(skill, index) in getUserSkills[0].skills"
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
                        class="btn btn-outline-primary btn-sm"
                        style="margin-left:10px;"
                        :to="{ name: 'EditarTools' }"
                        >Editar</router-link
                      >
                    </div>
                  </div>

                  <div
                    v-for="(tool, index) in getUserTools[0].tools"
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
export default {
  name: "Perfil",
  components: {
    Competence
  },
  created: function() {},
  computed: {
    getUserSkills() {
      let numeroEstudante = parseInt(this.$route.params.numeroEstudante);
      return this.$store.getters.getUserSkillsByNumeroEstudante(
        numeroEstudante
      );
    },
    getUserTools() {
      let numeroEstudante = parseInt(this.$route.params.numeroEstudante);
      return this.$store.getters.getUserToolsByNumeroEstudante(numeroEstudante);
    },
    getUsersCursosHistorico() {
      let numeroEstudante = parseInt(this.$route.params.numeroEstudante);
      return this.$store.getters.getUsersCursosHistoricoByNumeroEstudante(
        numeroEstudante
      );
    },
    getUsersLinks() {
      let numeroEstudante = parseInt(this.$route.params.numeroEstudante);
      return this.$store.getters.getUsersLinksByNumeroEstudante(
        numeroEstudante
      );
    },
    getUserInfomation() {
      let numeroEstudante = parseInt(this.$route.params.numeroEstudante);
      return this.$store.getters.getUserInformationByUsername(numeroEstudante);
    },
    getUserLoggedInformation() {
      return this.$store.getters.getLoggedUser;
    }
  },
  methods: {
    LimitNumberCharsLinkSize(link) {
      if (link.length > 15) {
        link = link.substr(0, 15) + "...";
      }
      return link;
    },
    verifyAlumniInNetwork(numeroEstudante) {
      return this.$store.getters.isAlumniInLoggedUserNetwork(numeroEstudante);
    },
    UnFollow(numeroEstudante) {
      this.$store.dispatch("unFollowAlumni", numeroEstudante);
    },
    Follow(numeroEstudante) {
      this.$store.dispatch("followAlumni", numeroEstudante);
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
