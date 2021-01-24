<template>
  <b-card
    :img-src="getBolsaImg"
    img-top
    img-height="250;"
    tag="article"
    style="max-width: 20rem"
  >
    <b-card-img> {{ bolsa.img }}</b-card-img>
    <b-card-title>{{ bolsa.title }}</b-card-title>
    <b-card-text> {{ getDescription(bolsa.description) }}</b-card-text>
    <span v-if="bolsaEstado()">
    <router-link
      :to="{ name: 'BolsaVerMais', params: { bolsaId: bolsa.id } }"
      class="btn btn-primary"
      variant="success"
    >
      VER MAIS
    </router-link>
    </span>
    <span v-else>
      <b-button  variant="danger" disabled>Terminado</b-button>
    </span>
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
    getBolsaImg() {
      return this.bolsa.img;
    },
  },
  methods: {
    deleteBolsa() {
      if (confirm("Deseja apagar esta oferta")) {
        this.$store.dispatch("deleteBolsa", this.bolsa.id);
        console.log("apagado");
      }
    },
    bolsaEstado() {
      if (this.bolsa.estado === "ativo") {
        return true;
      } else {
        return false;
      }
    },

    getDescription(desc) {
      if (desc.length < 30) {
        return desc;
      } else {
        return `${desc.substr(0, [30])}...`;
      }
    },
  },
};
</script>
