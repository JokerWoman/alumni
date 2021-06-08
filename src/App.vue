<template>
  <div id="app">
    <NavBar
      :isLoggedProfessor="isLoggedProfessor"
      :isLoggedUser="isLoggedUser"
      :loggedProfessorInformation="loggedProfessorInformation"
      :loggedAlumniInformation="loggedAlumniInformation"
    ></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.PrepareAsyncData();
  },
  computed: {
    ...mapGetters({
      isLoggedProfessor: "isLoggedProfessor",
      isLoggedUser: "isLoggedUser",
      loggedProfessorInformation: "getLoggedProfessorInformation",
      loggedAlumniInformation: "getLoggedAlumniInformation"
    })
  },
  methods: {
    async PrepareAsyncData() {
      await this.$store.dispatch("RetrieveLoggedAlumniInformation");
      await this.$store.dispatch("RetrieveLoggedProfessorInformation");
    }
  },
  metaInfo: {
    title: "Alumni ESMAD",
    titleTemplate: "%s | Antigos estudantes da ESMAD",
    htmlAttrs: {
      lang: "pt-PT"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content: "Esta página serve para encontrar cursos e emprego."
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "keywords",
        content:
          "Alumni, ESMAD, Cursos, Bolsas, Emprego, Estágios, Workshops, Portugal, Estudante"
      },
      { name: "author", content: "Grupo IV" }
    ]
  }
};
</script>

<style src="./assets/genericStyle.css"></style>
