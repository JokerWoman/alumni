<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-12">
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
                  <div class="col-sm-6 text-secondary">
                    <h6 class="mb-0">{{ alumni.numeroEstudante }}</h6>
                  </div>
                  <div class="col-sm-3" style="margin-top:-10px;">
                    <button class="btn btn-outline-primary">
                      Seguir
                    </button>

                    <router-link
                      :to="{
                        name: 'Perfil',
                        params: { numeroEstudante: alumni.numeroEstudante }
                      }"
                      class="btn btn-primary"
                      style="margin-left:10px;"
                      variant="success"
                    >
                      Visualizar
                    </router-link>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
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
  created: function() {
    console.log(this.alumnis);
  },
  methods: {}
};
</script>
