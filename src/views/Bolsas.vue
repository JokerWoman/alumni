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
          <b-row>
            <b-col sm="12">
              <b-form-textarea
                size="lg"
                v-model="frm.description"
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
              <b-form-select
                v-model="frm.company"
                :options="$store.getters.getCompaniesForSelect"
                required
              >
                <option value="null" disabled>Empresa</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-input type="date" v-model="frm.date_start"></b-form-input>
            </b-col>
          </b-row>

          <br />

          <b-row class="justify-content-md-center">
            <b-button type="submit" variant="danger">Submeter</b-button>
          </b-row>
        </b-form>
      </b-modal>

      <b-modal id="editBolsaModal" @show="getActiveBolsa" hide-footer>
        <b-form @submit.prevent="editBolsa">
          <b-row>
            <b-col sm="12">
              <b-form-textarea
                size="lg"
                v-model="frm.description"
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
              <b-form-select
                v-model="frm.company"
                :options="$store.getters.getCompaniesForSelect"
                required
              >
                <option value="null" disabled>Empresa</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-form-input type="date" v-model="frm.date_start"></b-form-input>
            </b-col>
            <b-col cols="6">
              <b-form-select v-model="frm.estado" :options="estado">
              </b-form-select>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-button type="submit" style="margin-right: 10px"
              >Submeter</b-button
            >
            <b-button
              @click="deleteBolsa()"
              data-mdb-dismiss="modal"
              style="margin-left: 10px"
              variant="danger"
              >Eliminar</b-button
            >
          </b-row>
        </b-form>
      </b-modal>
    </b-container>

    <br /><br />

    <b-container style="background-color: #6d6cba" fluid>
      <h1 v-if="!getBolsas.length">Não Foram Encontrados Bolsas!</h1>
      <b-row style="margin-right: 10%; margin-left: 10%">
        <b-card-group style="margin: 20px" v-if="getBolsas.length > 0">
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
            src="@/assets/img/logo.webp"
            class="img-fluid"
            height="250px"
            width="250px"
            alt="Logotipo da pagina"
          />
        </div>
        <div class="col-md-4 footer-nav">
          <h1 style="font-size: 25px">Outros Links </h1>
          <div class="col-md-6">
            <ul>
              <li>
                <router-link
                  :to="{ name: 'Empresas' }"
                  :class="{ active: $route.name === 'Empresas' }"
                  >Empresas Parceiras</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5 footer-nav">
          <h1 style="font-size: 25px">Localização —</h1>

          <div class="col-md-6">
            <ul>
              <li>Escola Superior de Media Artes e Design</li>
              <li>Campus 2 P.Porto ESMAD, 981, R.Dom Sancho l, 4480.876</li>

              <li
                style="
                  border-bottom: 1px solid rgba(0, 0, 0, 0.32);
                  border-top: 1px solid rgba(0, 0, 0, 0.32);
                "
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
        id: "",
        img: "",
        description: "",
        link: "",
        category: null,
        company: null,
        date_start: "",
        estado: "",
        id_professor: "",
        date_pub: ""
      },
      estado: [
        { value: null, text: "Escolhe uma opção" },
        { value: "ativo", text: "Ativo" },
        { value: "terminado", text: "Terminado" }
      ],
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
    getLoggedProfessorId() {
      return this.$store.getters.getLoggedProfessor.id_professor;
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
        category: this.frm.category,
        description: this.frm.description,
        img: this.frm.img,
        date_pub: date,
        date_start: this.frm.date_start,
        linkBolsa: this.frm.link,
        estado: "ativo",
        id_company: this.frm.company,
        id_professor: this.getLoggedProfessorId()
      };
      this.$store.dispatch("saveBolsa", bolsa);
    },
    clearForm() {
      this.frm.img = "";
      this.frm.description = "";
      this.frm.link = "";
      this.frm.category = null;
      this.frm.company = null;
      this.frm.date_start = "";
      this.frm.date_pub = "";
      this.frm.id_professor = "";
      this.frm.estado = "";
      this.frm.id = "";
    },

    editBolsa() {
      let bolsa = {
        id: this.frm.id,
        img: this.frm.img,
        description: this.frm.description,
        linkBolsa: this.frm.link,
        category: this.frm.category,
        id_company: this.frm.company,
        date_start: this.frm.date_start,
        estado: this.frm.estado,
        id_professor: this.frm.date_pub,
        date_pub: this.frm.date_pub
      };
      this.$store.dispatch("editBolsa", bolsa);
      this.$bvModal.hide("editBolsaModal");
      this.clearForm();
    },
    deleteBolsa() {
      if (confirm("Deseja apagar esta oferta")) {
        this.$store.dispatch("deleteBolsa", this.frm.id);
        console.log("apagado");
      }
      this.clearForm();
    },

    getActiveBolsa() {
      let bolsa = this.$store.getters.getActiveBolsa;
      this.frm.id = bolsa.id;
      this.frm.img = bolsa.img;
      this.frm.description = bolsa.description;
      this.frm.link = bolsa.linkBolsa;
      this.frm.category = bolsa.category;
      this.frm.company = bolsa.id_company;
      this.frm.date_start = bolsa.date_start;
      this.frm.estado = bolsa.estado;
      this.frm.id_nroProfessor = bolsa.id_professor;
      this.frm.date_pub = bolsa.date_pub;
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
