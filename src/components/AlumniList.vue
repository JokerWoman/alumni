<template>
  <div class="card mb-3">
    <div class="card-body">
      <!-- Titulo -->
      <div class="row">
        <div class="col-sm-3">
          <h6 class="mb-0">Nome</h6>
        </div>
        <div class="col-sm-3">
          <h6 class="mb-0">Numero Estudante</h6>
        </div>
        <div class="col-sm-3">
          <h6 class="mb-0">Email</h6>
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
          <div class="col-sm-3 text-secondary">
            <h6 class="mb-0">{{ alumni.id_nroEstudante }}</h6>
          </div>
          <div class="col-sm-3 text-secondary">
            <h6 class="mb-0">{{ alumni.email }}</h6>
          </div>
          <div class="col-sm-3" style="margin-top:-10px;">
            <b-button
              :to="{
                name: 'Perfil',
                params: { numeroEstudante: alumni.id_nroEstudante }
              }"
              class="btn btn-warning float-right"
              variant="warning"
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
  methods: {}
};
</script>
