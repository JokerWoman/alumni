<template>
  <b-card
    :img-src="bolsa.fotoLink"
    :title="getCompanyName(bolsa.id_empresa)"
    img-top
    tag="article"
    :id="`cardEvent${bolsa.id_bolsas}`"
    img-height="250px"
    style="width:260px; margin-left:50px; margin-right:50px; background-color:#f3f3fb"
    img-alt="Imagem da bolsa"
  >
    <b-card-text> {{ getDescription(bolsa.descricao) }}</b-card-text>

    <router-link
      v-if="bolsa.estado == 'ativo'"
      :to="{ name: 'BolsaVerMais', params: { bolsaId: bolsa.id_bolsas } }"
      class="btn btn-warning"
      variant="success"
      ><b-button
        class="btn btn-warning"
        variant="success"
        @click="setActiveBolsa(bolsa)"
      >
        VER MAIS
      </b-button>
    </router-link>

    <b-button v-else variant="danger" disabled>Terminado</b-button>

    <b-button
      v-if="isLoggedProfessor()"
      @click="setActiveBolsa(bolsa)"
      variant="danger"
      class="ml-3"
      v-b-modal.editBolsaModal
      >Editar</b-button
    >
  </b-card>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  name: "BolsasCard",
  props: {
    bolsa: Object
  },
  methods: {
    isLoggedProfessor() {
      return this.$store.getters.isLoggedProfessor;
    },
    getCompanyName(id) {
      var company = this.$store.getters.getCompanyById(id);
      return company.name;
    },
    setActiveBolsa(bolsa) {
      this.$store.dispatch("setActiveBolsa", bolsa);
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
