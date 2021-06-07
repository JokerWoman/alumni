<template>
  <!-- o b-nav-item do vue bootstrap comporta-se como um router-link -->

  <b-navbar toggleable="lg" type="light">
    <b-navbar-brand href="#" title="Logo da pagina"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <img
          src="@/assets/img/logo.webp"
          class="img-fluid"
          height="50px"
          width="50px"
          alt="logotipo da página"
        />

        <b-nav-item
          :to="{ name: 'Home' }"
          :class="{ active: $route.name === 'Home' }"
          >Alumni</b-nav-item
        >

        <template v-if="isLoggedProfessor || isLoggedUser === true">
          <b-nav-item
            :to="{ name: 'Eventos' }"
            :class="{ active: $route.name === 'Eventos' }"
            >Eventos</b-nav-item
          >

          <b-nav-item
            :to="{ name: 'Bolsas' }"
            :class="{ active: $route.name === 'Bolsas' }"
            >Bolsas de Emprego</b-nav-item
          >
        </template>
      </b-navbar-nav>
      <template
        v-if="
          isLoggedUser === true &&
            loggedAlumniInformation !== null &&
            loggedAlumniInformation.id_nroEstudante != null
        "
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            :text="loggedAlumniInformation.nome"
            right
            :class="{
              active: $route.name === 'Perfil' || $route.name === 'EditarPerfil'
            }"
          >
            <b-dropdown-item
              :to="{
                name: 'Perfil',
                params: {
                  numeroEstudante: loggedAlumniInformation.id_nroEstudante
                }
              }"
              >Perfil</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'ProcurarAlumni'
              }"
              >Procurar Alumnis</b-dropdown-item
            >
            <b-dropdown-item @click="logout()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
      <template
        v-else-if="
          isLoggedProfessor === true && loggedProfessorInformation !== null
        "
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="loggedProfessorInformation.nome" right>
            <b-dropdown-item @click="logout()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :to="{ name: 'Register' }"
            :class="{ active: $route.name === 'Register' }"
            >Registro</b-nav-item
          >
          <b-nav-item
            :to="{ name: 'Login' }"
            :class="{ active: $route.name === 'Login' }"
            >Entrar</b-nav-item
          >
        </b-navbar-nav>
      </template>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  created() {
    this.PrepareAsyncData();
  },
  computed: {
    ...mapGetters({
      loggedProfessorInformation: "getLoggedProfessorInformation",
      loggedAlumniInformation: "getLoggedAlumniInformation",
      isLoggedUser: "isLoggedUser",
      isLoggedProfessor: "isLoggedProfessor"
    })
  },
  methods: {
    async PrepareAsyncData() {
      await this.$store.dispatch("RetrieveLoggedAlumniInformation");
      await this.$store.dispatch("RetrieveLoggedProfessorInformation");
    },
    logout() {
      /* Chamar a ação disponivel no store */
      this.$store.dispatch("logout", this.$data);

      /* O logout foi feito redirecionamos 
            para o home*/
      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>

<style src="./../assets/navBarCustom.css"></style>
