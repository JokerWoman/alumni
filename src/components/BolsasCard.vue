<template>
  <b-card
    :img-src="getCategory.img"
    :img-alt="getCategory.name"
    img-top
    tag="article"
    style="max-width: 20rem"
  >
    <b-card-img> {{ bolsa.img }}</b-card-img>
    <b-card-title>{{ bolsa.title }}</b-card-title>
    <b-card-text> {{ bolsa.description }}</b-card-text>
    <b-button href="#" variant="primary">Ver mais</b-button>
    <b-button @click="deleteBolsa" variant="danger">Apagar</b-button>
  </b-card>
</template>

<script>
export default {
  name: "BolsasCard",
  props: {
    bolsa: Object,
  },
  computed: {
    getCategory() {
      return this.$store.getters.getCategoryById(this.bolsa.category);
    },
  },
  methods: {
    deleteBolsa() {
      if (confirm("Deseja apagar esta oferta")) {
        this.$store.dispatch("deleteBolsa", this.bolsa.id);
        console.log("apagado");
      }
    },
  },
};
</script>
