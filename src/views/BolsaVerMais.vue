<template>
  <div id="bolsa">
      Bolsa:{{$route.params.bolsaId}}
    <h1>
    {{getBolsa.title}}
    </h1>
    <img :src=getBolsa.img alt="">
    <p>{{getBolsa.description}}</p>
   
  </div>
</template>

<script>
export default {
  name: "BolsaVerMais",
  methods: {
   
  },
  computed: {
    getBolsa() {
      return this.$store.getters.getBolsaById(this.$route.params.bolsaId);
    },
  },
};
</script>

<style>
</style>