<template>
  <b-card
    :img-src="bolsa.img"
    :title="bolsa.name"
    img-top
    tag="article"
    :id="`cardEvent${bolsa.id}`"
    img-height="250px"
    style="width:260px; margin-left:50px; margin-right:50px; background-color:#f3f3fb"
    img-alt="Imagem da bolsa"
  >
    <b-card-text> {{ getDescription(bolsa.description) }}</b-card-text>

    <router-link
      v-if="bolsa.estado == 'ativo'"
      :to="{ name: 'BolsaVerMais', params: { bolsaId: bolsa.id } }"
      class="btn btn-warning"
      variant="success"
    >
      VER MAIS
    </router-link>

    <b-button v-else variant="danger" disabled>Terminado</b-button>

    <b-button
      v-if="isLoggedProfessor() && bolsa.estado == 'ativo'"
      @click="finishBolsa"
      variant="danger"
      class="ml-1"
      >Terminar</b-button
    >

    <b-button
      v-if="isLoggedProfessor()"
      @click="deleteBolsa"
      variant="danger"
      class="ml-3"
      >Apagar</b-button
    >
  </b-card>
</template>

<script>
export default {
  name: "BolsasCard",
  props: {
    bolsa: Object
  },
  methods: {
    isLoggedProfessor() {
      if (this.$store.getters.isLoggedProfessor != {}) {
        return false;
      }
      return true;
    },

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
    finishBolsa() {
      this.$store.dispatch("finishBolsa", this.bolsa.id);
      console.log("finished");
    },

    getDescription(desc) {
      if (desc.length < 60) {
        return desc;
      } else {
        return `${desc.substr(0, [60])}...`;
      }
    }
  }
};
</script>
