<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-4 mb-3">
          <div class="container" style="margin-top: 20px">
            <div
              style="
                width: 250px;
                height: 250px;
                border-radius: 10%;
                overflow: hidden;
              "
            >
              <img
                :src="getBolsa.img"
                alt="foto da bolsa"
                width="250"
                height="250"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="container">
            <div>
              <div class="row">
                <div class="col-sm-3">
                  <h2 class="mb-0" style="margin-left: 220px">
                    {{ getBolsa.title }}
                  </h2>
                </div>
              </div>
              <br />

              <div style="height: 200px">
                <p style="width: 90%">{{ getBolsa.description }}</p>

                <br />
                <p>CTT: {{ getBolsa.phone }}</p>
                <p>Email: {{ getBolsa.email }}</p>
              </div>
              <br />
              <br />
              <button
                @click="openOferta()"
                class="btn btn-warning"
                style="margin-left: 200px"
              >
                Responder à Oferta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BolsaVerMais",
  methods: {
    openOferta() {
      window.open(this.getBolsa.linkBolsa);
    }
  },
  computed: {
    getBolsa() {
      return this.$store.getters.getBolsaById(this.$route.params.bolsaId);
    }
  }
};
</script>

<style></style>
