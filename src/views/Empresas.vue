<template>
  <div>
    <b-container>
      <b-row class="justify-content-md-left">
        <b-col cols="2" style="margin-top: 40px" v-if="getLoggedUserType()">
          <b-button variant="primary" v-b-modal.createCompanyModal
            >Adicionar Empresa</b-button
          >
        </b-col>
      </b-row>

      <b-modal id="createCompanyModal" @show="clearForm" hide-footer>
        <b-form @submit.prevent="createCompany">
          <b-row>
            <b-col cols="6">
              <b-form-input
                type="text"
                v-model="frm.name"
                placeholder="Nome da empresa"
                required
              ></b-form-input>
            </b-col>
            <b-col cols="6">
              <b-form-input
                v-model="frm.phone"
                type="number"
                placeholder="Telefone"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>
          <br />

          <b-row>
            <b-col cols="6">
              <b-form-input
                type="text"
                v-model="frm.locality"
                placeholder="Cidade"
                required
              ></b-form-input>
            </b-col>

            <b-col cols="6">
              <b-form-input
                v-model="frm.email"
                type="email"
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

      <b-modal id="editCompanyModal" @show="getActiveCompany" hide-footer>
        <b-form @submit.prevent="editCompany">
          <b-row>
            <b-col cols="6">
              <b-form-input
                type="text"
                v-model="frm.name"
                placeholder="Nome da empresa"
                required
              ></b-form-input>
            </b-col>
            <b-col cols="6">
              <b-form-input
                v-model="frm.phone"
                type="number"
                placeholder="Telefone"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>
          <br />

          <b-row>
            <b-col cols="6">
              <b-form-input
                type="text"
                v-model="frm.locality"
                placeholder="Cidade"
                required
              ></b-form-input>
            </b-col>

            <b-col cols="6">
              <b-form-input
                v-model="frm.email"
                type="email"
                placeholder="Email"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>
          <br />

          <b-row class="justify-content-md-center">
            <b-button type="submit" style="margin-right: 10px"
              >Submeter</b-button
            >
            <b-button
              @click="deleteCompany()"
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
      <h1 v-if="!getCompanies.length">Não Foram Encontrados Empresas!</h1>
      <b-row style="margin-right: 10%; margin-left: 10%">
        <b-card-group style="margin: 20px" v-if="getCompanies.length > 0">
          <CompanyCard
            v-for="company in getCompanies"
            :key="company.id_company"
            :company="company"
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
          <h4>Outros Links —</h4>
          <div class="col-md-6">
            <ul>
              <li><a href="">Cartão Alumni</a></li>
              <li><a href="">FAQ's</a></li>
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
          <h4>Localização —</h4>

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
import CompanyCard from "../components/CompanyCard";
export default {
  name: "Company",
  components: {
    CompanyCard
  },
  data() {
    return {
      frm: {
        id_company: "",
        name: "",
        phone: "",
        email: "",
        locality: ""
      }
    };
  },

  methods: {
    getLoggedUserType() {
      return this.$store.getters.getLoggedProfessor ? true : false;
    },
    createCompany() {
      const company = {
        id_company: this.$store.getters.getNextCompanyId,
        name: this.frm.name,
        phone: this.frm.phone,
        email: this.frm.email,
        locality: this.frm.locality
      };
      this.$store.dispatch("createCompany", company);
    },
    clearForm() {
      this.frm.id_company = "";
      this.frm.name = "";
      this.frm.phone = "";
      this.frm.email = "";
      this.frm.locality = "";
    },

    editCompany() {
      let company = {
        id_company: this.frm.id_company,
        name: this.frm.name,
        phone: this.frm.phone,
        email: this.frm.email,
        locality: this.frm.locality
      };
      this.$store.dispatch("editCompany", company);
      this.$bvModal.hide("editCompanyModal");
      this.clearForm();
    },

    deleteCompany() {
      if (confirm("Deseja apagar esta empresa")) {
        this.$store.dispatch("deleteCompany", this.frm.id_company);
        console.log("apagado");
      }
      this.clearForm();
    },

    getActiveCompany() {
      let company = this.$store.getters.getActiveCompany;
      this.frm.id_company = company.id_company;
      this.frm.name = company.name;
      this.frm.phone = company.phone;
      this.frm.email = company.email;
      this.frm.locality = company.locality;
    }
  },
  computed: {
    getCompanies() {
      return this.$store.getters.getCompanies;
    }
  }
};
</script>
