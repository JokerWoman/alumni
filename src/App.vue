<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
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
