<template>
  <!-- o b-nav-item do vue bootstrap comporta-se como um router-link -->

  <b-navbar toggleable="lg" type="light">
    <b-navbar-brand href="#"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'Home' }"
          :class="{ active: $route.name === 'Home' }"
          >Alumni</b-nav-item
        >

        <template v-if="this.$store.getters.isLoggedUser">
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
        <template v-else-if="this.$store.getters.isLoggedProfessor">
          <!-- Adicionem o nome das duas routes abaixo e o class
               :to="{ name: 'Bolsas' }"
               :class="{ active: $route.name === 'Bolsas' }" 
          -->
          <b-nav-item>Adicionar Eventos</b-nav-item>

          <b-nav-item
            :to="{ name: 'Bolsas' }"
            :class="{ active: $route.name === 'Bolsas' }"
            >Bolsas de Emprego</b-nav-item
          >

          <b-nav-item
            :to="{ name: 'AdicionarBolsa' }"
            :class="{ active: $route.name === 'AdicionarBolsa' }"
            >Adicionar Bolsas de Emprego</b-nav-item
          >
        </template>
      </b-navbar-nav>
      <template v-if="this.$store.getters.isLoggedUser">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            :text="this.$store.getters.getLoggedUser.nome"
            right
            :class="{
              active:
                $route.name === 'Perfil' || $route.name === 'EditarPerfil',
            }"
          >
            <b-dropdown-item
              :to="{
                name: 'Perfil',
                params: {
                  numeroEstudante: this.$store.getters.getLoggedUser
                    .numeroEstudante,
                },
              }"
              >Perfil</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'ProcurarAlumni',
              }"
              >Procurar Alumnis</b-dropdown-item
            >
            <b-dropdown-item @click="logoutUser()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
      <template v-else-if="this.$store.getters.isLoggedProfessor">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            :text="this.$store.getters.getLoggedProfessor.nome"
            right
          >
            <b-dropdown-item @click="logoutProfessor()">Sair</b-dropdown-item>
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
  methods: {
    logoutUser() {
      /* Chamar a ação disponivel no store */
      this.$store.dispatch("logoutUser", this.$data);

      /* O logout foi feito redirecionamos 
            para o home*/
      this.$router.push({ name: "Home" });
    },
    logoutProfessor() {
      /* Chamar a ação disponivel no store */
      this.$store.dispatch("logoutProfessor", this.$data);

      /* O logout foi feito redirecionamos 
            para o home*/
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style src="./../assets/navBarCustom.css"></style>
