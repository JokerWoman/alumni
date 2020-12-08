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
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          text="Utilizador"
          right
          :class="{ active: $route.name === 'Perfil' }"
        >
          <b-dropdown-item :to="{ name: 'Perfil' }">Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style src="./../assets/navBarCustom.css"></style>
