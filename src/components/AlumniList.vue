<template>
  <div class="card mb-3">
    <div class="card-body">
      <!-- Titulo -->
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Nome</h6>
        </div>
        <div class="col-sm-6">
          <h6 class="mb-0">Numero Estudante</h6>
        </div>
        <div class="col-sm-3"></div>
      </div>

      <hr />
      <!-- Lista dos Alumnis -->
      <div v-for="(alumni, index) in alumnis" v-bind:key="index">
        <div class="row" style="padding-top:10px;">
          <div class="col-sm-3 text-secondary">
            <h6 class="mb-0">{{ alumni.nome }}</h6>
          </div>
          <div class="col-sm-4 text-secondary">
            <h6 class="mb-0">{{ alumni.numeroEstudante }}</h6>
          </div>
          <div class="col-sm-5" style="margin-top:-10px;">
            <template
              v-if="verifyAlumniInNetwork(alumni.numeroEstudante) === true"
            >
              <b-button
                class="btn btn-primary"
                variant="danger"
                style="width:180px;"
                v-on:click="UnFollow(alumni.numeroEstudante)"
              >
                Deixar de seguir
              </b-button>
            </template>
            <template v-else>
              <button
                class="btn btn-primary"
                style="width:180px;"
                v-on:click="Follow(alumni.numeroEstudante)"
              >
                Seguir
              </button>
            </template>

            <b-button
              :to="{
                name: 'Perfil',
                params: { numeroEstudante: alumni.numeroEstudante }
              }"
              class="btn btn-primary"
              variant="primary"
              style="margin-left:10px; width:180px;"
            >
              Visualizar
            </b-button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlumniList",
  props: {
    alumnis: Array
  },
  created: function() {},
  methods: {
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
