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
    <b-row class="justify-content-md-center">
      <b-col>
        <p>Data</p>
        <b-form-select v-model="optionSortSelected" :options="optionsSort">
        </b-form-select>
      </b-col>
      <b-col>
        <p>Localidade</p>
        <b-form-input
          type="text"
          placeholder="Exemplo: Porto"
          v-model="locality"
        ></b-form-input>
      </b-col>
      <b-col>
        <p>Tipo</p>
        <b-form-select v-model="categorySelected" :options="getCategories">
          <template #first>
            <b-form-select-option value="all">TODAS</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>
    <br />
    <br />
  <div id="myDiv">
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
  </div>
</template>

<script>
import BolsasCard from "../components/BolsasCard";
export default {
  name: "Bolsas",
  components: {
    BolsasCard,
  },

  data() {
    return {
      categorySelected: "all",
      locality: "",
      optionSortSelected: 1,
      optionsSort: [
        {
          value: 1,
          text: "Mais Recentes",
        },
        {
          value: -1,
          text: "Mais Antigos",
        },
      ],

      filterCategorySelected: "all",
    };
  },
  computed: {
    /*
    getBolsas() {
      return this.$store.getters.getBolsas;
    },*/

    getBolsas() {
      return this.$store.getters.getBolsasFiltered(
        this.categorySelected,
        this.locality.toUpperCase(),
        this.optionSortSelected
      );
    },
    getCategories() {
      return this.$store.getters.getCategoriesForSelect;
    },
  },
};
</script>

