<template>
  <div id="navbar">
    <div id="nav">
      <router-link to="/">Alumni</router-link> |
      <router-link :to="{ name: 'Eventos' }">Eventos</router-link> |
      <router-link :to="{ name: 'Bolsas' }">Bolsas de Emprego</router-link> |
      <router-link :to="{ name: 'Perfil' }">Perfil</router-link> |
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>
