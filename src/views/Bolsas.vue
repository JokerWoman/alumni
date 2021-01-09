<template>
  <div id="bolsas" class="container">
    <h1>Bolsas de Emprego</h1>

    <router-link
      class="btn btn-primary"
      style="margin-left: 10px"
      :to="{ name: 'AdicionarBolsa' }"
      >Adicionar</router-link
    >
    <br />
    <br />

    <b-row>
      <b-card-group columns v-if="getBolsas.length > 0">
        <BolsasCard
          v-for="myBolsa in getBolsas"
          :key="myBolsa.id"
          :bolsa="myBolsa"
        />
      </b-card-group>
      <p v-else>Não há ofertas criadas!</p>
    </b-row>
  </div>
</template>

<script>
import BolsasCard from "../components/BolsasCard";
export default {
  name: "Bolsas",
  components: {
    BolsasCard
  },
  data() {
    return {};
  },
  computed: {
    getBolsas() {
      return this.$store.getters.getBolsas;
    }
  }
};
</script>
