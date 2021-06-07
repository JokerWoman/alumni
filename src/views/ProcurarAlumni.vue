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

            <div class="col-sm-3 text-secondary">
              <input
                class="mb-4"
                type="text"
                v-model="filterEmail"
                placeholder="Email Alumni"
              />
            </div>
          </div>

            <AlumniList :alumnis="allAlumniInformations"> </AlumniList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlumniList from "../components/AlumniList";
import { mapGetters } from "vuex";

export default {
  name: "ProcurarAlumni",
  components: {
    AlumniList
  },
  data() {
    return {
      filterName: "",
      filterEmail: ""
    };
  },
  created: function() {
    this.PrepareAsyncData();
  },
  watch: {
    filterName: function(val) {
      this.filterName = val;
      this.PrepareAsyncData();
    },
    filterEmail: function(val) {
      this.filterEmail = val;
      this.PrepareAsyncData();
    }
  },
  computed: {
    ...mapGetters({
      allAlumniInformations: "getAllAlumniInformation",
      isLoggedUser: "isLoggedUser",
      isLoggedProfessor: "isLoggedProfessor",
      getLoggedUser: "getLoggedUser"
    })
  },
  methods: {
    async PrepareAsyncData() {
      const filtros = {
        nome: this.filterName,
        email: this.filterEmail
      };

    await this.$store.dispatch(
        "RetrieveAllAlumniInformation",
        filtros
      );
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
