<template>
  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
              <img
                src="@/assets/img/registo.webp"
                alt="foto de uma pessoa a fazer um registo"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">
            <form @submit.prevent="register">
              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Numero de estudante</h6>
                  </label>
                  <input
                    class="mb-4"
                    type="text"
                    v-model="registo.numeroEstudante"
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Email</h6>
                  </label>
                  <input type="email" v-model="registo.email" />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Nome Completo</h6>
                  </label>
                  <input class="mb-4" type="text" v-model="registo.nome" />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Morada</h6>
                  </label>
                  <input type="text" v-model="registo.morada" />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Palavra Passe</h6>
                  </label>
                  <input
                    type="password"
                    class="mb-4"
                    v-model="registo.password"
                    required
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Nacionalidade</h6>
                  </label>
                  <input type="text" v-model="registo.nacionalidade" disabled />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Confirmação Palavra Passe</h6>
                  </label>
                  <input
                    type="password"
                    class="mb-4"
                    v-model="passwordVerification"
                    required
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Numero Cartão Cidadão</h6>
                  </label>
                  <input type="text" v-model="registo.CC" />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Data de nascimento</h6>
                  </label>
                  <input
                    class="mb-4"
                    type="date"
                    v-model="registo.data_Nasc"
                    required
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Numero de Telemovel</h6>
                  </label>
                  <input class="mb-4" type="text" v-model="registo.telemovel" />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Genero</h6>
                  </label>
                  <br />

                  <label class="radio">
                    <input
                      type="radio"
                      name="gender"
                      value="Masculino"
                      v-model="registo.genero"
                    />
                    <span class="mb-4"> Masculino </span>
                  </label>

                  <label class="radio" style="padding-left:10px;">
                    <input
                      type="radio"
                      name="gender"
                      v-model="registo.genero"
                      value="Feminino"
                    />
                    <span class="mb-4">Feminino </span>
                  </label>
                </div>

                <div class="col-lg-6"></div>
              </div>

              <div class="row px-3">
                <label>{{ formErros }}</label>
              </div>

              <div class="row mb-3 px-3">
                <button type="submit" class="btn btn-blue text-center">
                  REGISTAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registo: {
        numeroEstudante: "",
        nome: "",
        password: "",
        genero: "",
        morada: "",
        data_Nasc: "",
        email: "",
        telemovel: "",
        CC: "",
        nacionalidade: "Portuguese",
        descricao: ""
      },
      passwordVerification: "",
      formErros: ""
    };
  },
  methods: {
    register() {
      try {
        /* Limpar erros do formulário registo */
        this.$data.formErros = "";

        if (this.$data.passwordVerification != this.$data.registo.password) {
          throw "As passwords tem que ser iguais.";
        }
        if (this.$data.registo.genero === "") {
          throw "Tem que selecionar algum genero.";
        }

        if (isNaN(this.$data.registo.numeroEstudante)) {
          throw "O número de estudante só pode conter numeros.";
        }

        /* Chamar a ação disponivel no store */
        this.$store.dispatch("register", this.$data.registo);

        /* Se o registo falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o login não vai ser executado */
        this.$router.push({ name: "Login" });
      } catch (error) {
        /* Mostrar os erros do formulário */
        this.$data.formErros = error;
      }
    }
  }
};
</script>

<style src="./../assets/authentication.css"></style>
