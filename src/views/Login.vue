<template>
  <div class="container px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
              <img src="@/assets/img/login.jpg" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">
            <form @submit.prevent="login">
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Numero de estudante</h6>
                </label>
                <input
                  class="mb-4"
                  type="text"
                  v-model="loginData.nroEstudante"
                />
              </div>
              <div class="row px-3">
                <label class="mb-1">
                  <h6 class="mb-0 text-sm">Palavra passe</h6>
                </label>
                <input type="password" v-model="loginData.password" />
              </div>

              <div class="row px-3">
                <label>{{ formErros }}</label>
              </div>

              <div class="row mb-3 px-3">
                <button type="submit" class="btn btn-blue text-center">
                  LOGIN
                </button>
              </div>
            </form>
            <div class="row mb-4 px-3">
              <small class="font-weight-bold"
                >Não tens conta?
                <router-link class="text-danger " :to="{ name: 'Register' }"
                  >Registar</router-link
                >
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        nroEstudante: "",
        password: ""
      },
      formErros: ""
    };
  },
  methods: {
    login() {
      try {
        this.formErros = "";

        /* Chamar a ação disponivel no store */
        this.$store.dispatch("login", this.$data.loginData);

        /* Se o login falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o home não vai ser executado */
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.formErros = error;
      }
    }
  }
};
</script>

<style src="./../assets/authentication.css"></style>
