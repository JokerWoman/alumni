<template>
  <div>
    <b-container fluid>
      <div class="row">
        <div class="col-lg-5" style="padding-top:200px; padding-left:120px;">
          <h1>[404] PAGE NOT FOUND</h1>
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
export default {
  name: "PageNotFound",

  components: {},

  methods: {}
};
</script>

<style src="./../assets/footer.css"></style>
