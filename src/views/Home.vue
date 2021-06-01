<template>
  <div>
    <b-container fluid>
      <div class="row">
        <div class="col-lg-5" style="padding-top:200px; padding-left:150px;">
          <h1>BEM-VINDOS AO PORTAL ALUMNI ESMAD</h1>
          <h2 style="font-size:15px" v-if="checkLogin()">
            Faça Parte da Nossa Comunidade
          </h2>
          <div class="d-lg-flex" v-if="checkLogin()">
            <b-button
              :to="{
                name: 'Login'
              }"
              class="btn btn-primary"
              variant="primary"
              style="margin-top:20px; width:180px;"
            >
              Login
            </b-button>

            <b-button
              :to="{
                name: 'Register'
              }"
              class="btn btn-primary"
              variant="primary"
              style="margin-left:15px; margin-top:20px;width:180px;"
            >
              Registar
            </b-button>
          </div>
        </div>
        <div class="col-lg-7">
          <img
            src="@/assets/img/home.webp"
            alt="foto de um homem"
            class="img-fluid h-10"
          />
        </div>
      </div>
    </b-container>

    <b-container style="background-color: #6d6cba; height:500px;" fluid>
      <div
        style="background-color: #FFCA1C; margin-top: 0px; width: 160px; height: 41px; padding:7px"
      >
        <h4 style="color:white;">Testemunhas</h4>
      </div>

      <b-row>
        <b-card-group style="margin:20px">
          <TestimonyCard
            v-for="testimony in getTestimonys"
            :key="testimony.id"
            :testimony="testimony"
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
            alt="logotipo da página"
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
import TestimonyCard from "../components/TestimonyCard";

export default {
  name: "Home",

  components: {
    TestimonyCard
  },

  methods: {
    checkLogin() {
      if (
        this.$store.getters.isLoggedUser != {} &&
        !this.$store.getters.isLoggedProfessor != {}
      ) {
        return false;
      } else {
        return true;
      }
    }
  },

  computed: {
    getTestimonys() {
      return this.$store.getters.getTestimonys;
    }
  }
};
</script>

<style src="./../assets/footer.css"></style>
