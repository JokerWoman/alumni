<template>
  <div>
    <b-container>
      <b-row class="justify-content-md-left">
        <b-col cols="2">
          <b-form-select v-model="optionSortSelected" :options="optionsSort">
          </b-form-select>
        </b-col>
        <b-col cols="2">
          <b-form-select v-model="categorySelected" :options="getCategories">
            <template #first>
              <b-form-select-option value="all">TODAS</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="2" style="margin-top: 5px">
          <b-form-input
            type="text"
            placeholder="Exemplo: Porto"
            v-model="locality"
          ></b-form-input>
        </b-col>
        
        <b-col cols="2" style="margin-top: 40px" v-if="getLoggedUserType()">
          <b-button variant="primary" v-b-modal.createBolsaModal
            >Criar Bolsa</b-button
          >
        </b-col>
      </b-row>

      <b-modal id="createBolsaModal" @show="clearForm" hide-footer>
        <b-form @submit.prevent="onSubmit()">
          <b-form-input
            type="text"
            v-model="frm.title"
            placeholder="Título"
            required
          ></b-form-input>

          <b-row>
            <b-col sm="12">
              <b-form-textarea
                size="lg"
                placeholder="Descrição"
                required
              ></b-form-textarea>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="6">
              <b-form-input
                type="url"
                v-model="frm.img"
                placeholder="Imagem"
                required
              ></b-form-input>
            </b-col>
            <br />
            <b-col cols="6">
              <b-form-input
                type="url"
                v-model="frm.link"
                placeholder="Link da Oferta"
                required
              ></b-form-input>
            </b-col>
            <br />
          </b-row>

          <b-row>
            <b-col cols="6">
              <b-form-select
                v-model="frm.category"
                :options="$store.getters.getCategoriesForSelect"
                required
              >
                <option value="null" disabled>Tipo</option>
              </b-form-select>
            </b-col>

            <b-col cols="6">
              <b-form-input
                type="text"
                v-model="frm.locality"
                placeholder="Cidade"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-form-input
                type="number"
                v-model="frm.phone"
                placeholder="Telefone"
                required
              >
              </b-form-input>
            </b-col>

            <b-col cols="6">
              <b-form-input
                type="email"
                v-model="frm.email"
                placeholder="Email"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>

          <br />

          <b-row class="justify-content-md-center">
            <b-button type="submit" variant="danger">Submeter</b-button>
          </b-row>
        </b-form>
      </b-modal>
    </b-container>

    <br><br>
    
    <b-container style="background-color: #2b4c8c" fluid>
    <h1 v-if="!getBolsas.length">Não Foram Encontrados Eventos!</h1>
      <b-row style="margin-right:10%;margin-left:10%">
        <b-card-group style="margin:20px" v-if="getBolsas.length > 0" >
          <BolsasCard
            v-for="myBolsa in getBolsas"
            :key="myBolsa.id"
            :bolsa="myBolsa"
          />
        </b-card-group>
      </b-row>
    </b-container>

    <!----------- Footer ------------>
    <footer class="footer_custom">
      <div class="row">
        <div class="col-md-3 text-center">
          <img
            src="@/assets/logo.png"
            class="img-fluid"
            height="250px"
            width="250px"
            alt="Logotipo da pagina"
          />
        </div>
        <div class="col-md-4 footer-nav">
          <h4>Outros Links —</h4>
          <div class="col-md-6">
            <ul>
              <li><a href="">Cartão Alumni</a></li>
              <li><a href="">FAQ's</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-5 footer-nav">
          <h4>Localização —</h4>

          <div class="col-md-6">
            <ul>
              <li>Escola Superior de Media Artes e Design</li>
              <li>Campus 2 P.Porto ESMAD, 981, R.Dom Sancho l, 4480.876</li>

              <li
                style="border-bottom: 1px solid rgba(0, 0, 0, 0.32);border-top: 1px solid rgba(0, 0, 0, 0.32);"
              >
                252 291 700
              </li>

              <li>academicos-campus2@sc.ipp.pt</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
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
    return {
      frm: {
        title: "",
        img: "",
        description: "",
        link: "",
        category: null,
        locality: "",
        phone: "",
        email: ""
      },
      categorySelected: "all",
      locality: "",
      optionSortSelected: 1,
      optionsSort: [
        {
          value: 1,
          text: "Mais Recentes"
        },
        {
          value: -1,
          text: "Mais Antigos"
        }
      ],

      filterCategorySelected: "all"
    };
  },
  methods: {
    getLoggedUserType() {
      return this.$store.getters.getLoggedProfessor ? true : false;
    },
    onSubmit() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      const bolsa = {
        id: this.$store.getters.getNextBolsaId,
        title: this.frm.title,
        category: this.frm.category,
        description: this.frm.description,
        img: this.frm.img,
        locality: this.frm.locality,
        date: date,
        phone: this.frm.phone,
        email: this.frm.email,
        linkBolsa: this.frm.link,
        estado: "ativo"
      };
      this.$store.dispatch("saveBolsa", bolsa);
    },
    clearForm(){

      
    }
  },
  computed: {
    getBolsas() {
      return this.$store.getters.getBolsasFiltered(
        this.categorySelected,
        this.locality.toUpperCase(),
        this.optionSortSelected
      );
    },
    getCategories() {
      return this.$store.getters.getCategoriesForSelect;
    }
  }
};
</script>
