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
                style="padding-top: 64px;"
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
                    name="nroestudante"
                    id="nroestudante"
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Email</h6>
                  </label>
                  <input
                    type="email"
                    v-model="registo.email"
                    name="email"
                    id="email"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Nome Completo</h6>
                  </label>
                  <input
                    class="mb-4"
                    type="text"
                    v-model="registo.nome"
                    name="nome"
                    id="nome"
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Morada</h6>
                  </label>
                  <input
                    type="text"
                    v-model="registo.morada"
                    name="morada"
                    id="morada"
                  />
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
                    name="password"
                    id="password"
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Nacionalidade</h6>
                  </label>
                  <input
                    type="text"
                    v-model="registo.nacionalidade"
                    disabled
                    name="nacionalidade"
                    id="nacionalidade"
                  />
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
                    name="confirmar"
                    id="confirmar"
                    required
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Numero Cartão Cidadão</h6>
                  </label>
                  <input type="text" v-model="registo.CC" name="cc" id="cc" />
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
                    name="data_Nasc"
                    id="data_Nasc"
                  />
                </div>

                <div class="col-lg-6">
                  <label class="mb-1">
                    <h6 class="mb-0 text-sm">Numero de Telemovel</h6>
                  </label>
                  <input
                    class="mb-4"
                    type="text"
                    v-model="registo.telemovel"
                    name="numero"
                    id="numero"
                  />
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
                      id="generoM"
                    />
                    <span class="mb-4"> Masculino </span>
                  </label>

                  <label class="radio" style="padding-left:10px;">
                    <input
                      type="radio"
                      name="gender"
                      v-model="registo.genero"
                      value="Feminino"
                      id="generoF"
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
                <button
                  type="submit"
                  id="registar"
                  class="btn btn-warning text-center"
                  variant="warning"
                >
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
    async register() {
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

        /* Remover o cartão de cidadão */
        const alumni = {
          id_nroEstudante: this.registo.numeroEstudante,
          nome: this.registo.nome,
          dataNascimento: this.registo.data_Nasc,
          morada: this.registo.morada,
          email: this.registo.email,
          descricao: " " /* Space intencional para guardar a vazio */,
          telemovel: this.registo.telemovel,
          password: this.registo.password,
          id_role: "3", // Alumni Normal
          id_genero: this.registo.genero === "Masculino" ? 1 : 2
        };

        /* Chamar a ação disponivel no store */
        await this.$store.dispatch("register", alumni);

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
