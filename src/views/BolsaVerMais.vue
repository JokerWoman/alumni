<template>
  <div id="bolsa">
    Bolsa:{{ $route.params.bolsaId }}

    <h1 style="margin-left: 250px; top: 50%; width: 80%; text-align: center">
      {{ getBolsa.title }}
    </h1>

    <p style="margin-left: 500px; top: 50%; width: 40%">
      {{ getBolsa.description }}
    </p>

    <img :src="getBolsa.img" alt="" width="400" height="300" />

    <a href="#" class="btn btn-primary">Responder Oferta</a>
  </div>
</template>

<script>
export default {
  name: "BolsaVerMais",
  methods: {},
  computed: {
    getBolsa() {
      return this.$store.getters.getBolsaById(this.$route.params.bolsaId);
    },
  },
};
</script>

<style>
</style>