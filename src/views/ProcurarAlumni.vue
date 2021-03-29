<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-sm-1" style="padding-top:10px;">
              <h6 class="mb-0">Procurar:</h6>
            </div>
            <div class="col-sm-3 text-secondary">
              <input
                class="mb-4"
                type="text"
                v-model="filterName"
                placeholder="Nome Alumni"
              />
            </div>

            <div class="text-secondary">
              <select v-model="filterSelectedCurso">
                <option value="TODOS">TODOS</option>
                <option
                  v-for="(curso, index) in this.$store.getters
                    .getCursosAvailable"
                  v-bind:value="curso.title"
                  v-bind:key="index"
                >
                  {{ curso.title }}
                </option>
              </select>
            </div>
          </div>
          <AlumniList :alumnis="AlumnisInformation"> </AlumniList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlumniList from "../components/AlumniList";

export default {
  name: "ProcurarAlumni",
  components: {
    AlumniList
  },
  data() {
    return {
      filterName: "",
      filterSelectedCurso: null
    };
  },
  created: function() {},
  // todo falta aqui um watcher
  computed: {
    AlumnisInformation() {
      let allAlumni = this.$store.getters
        .getAllAlumnisInformationExceptLoggedUser;

      if (this.filterName !== "") {
        allAlumni = allAlumni.filter(alumni =>
          alumni.nome.toUpperCase().includes(this.filterName.toUpperCase())
        );
      }

      if (
        this.filterSelectedCurso != null &&
        this.filterSelectedCurso != "TODOS"
      ) {
        allAlumni = allAlumni.filter(alumni =>
          this.$store.getters.AlumniHasCursoByTitle(
            alumni.numeroEstudante,
            this.filterSelectedCurso
          )
        );
      }

      return allAlumni;
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
