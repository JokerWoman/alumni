<template>
  <!-- o b-nav-item do vue bootstrap comporta-se como um router-link -->

  <b-navbar toggleable="lg" type="light">
    <b-navbar-brand href="#" title="Logo da pagina"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <img
          src="@/assets/img/logonavbar.webp"
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

        <template v-if="isLoggedProfessor === true || isLoggedAlumni === true">
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
          isLoggedAlumni === true &&
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
export default {
  name: "NavBar",
  props: {
    isLoggedProfessor: Boolean,
    isLoggedAlumni: Boolean,
    loggedProfessorInformation: Object,
    loggedAlumniInformation: Object
  },
  watch: {
    isLoggedProfessor: function(newVal, oldVal) {
      console.log("Prop mudou isLoggedProfessor: ", newVal, " | era: ", oldVal);
    },
    isLoggedAlumni: function(newVal, oldVal) {
      console.log("Prop mudou isLoggedAlumni: ", newVal, " | era: ", oldVal);
    },
    loggedAlumniInformation: function(newVal, oldVal) {
      console.log(
        "Prop mudou loggedAlumniInformation: ",
        newVal,
        " | era: ",
        oldVal
      );
    },
    loggedProfessorInformation: function(newVal, oldVal) {
      console.log(
        "Prop mudou loggedProfessorInformation: ",
        newVal,
        " | era: ",
        oldVal
      );
    }
  },
  methods: {
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
