<template>
  <div class="container register">
    <div class="row" style="padding-top:60px;">
      <div class="col-md-3 register-left">
        <img src="https://www.esmad.ipp.pt/noticias/bem-vindo-a-esmad-cnaes/image_large" width="180" height="100" alt="" />
        <h3>Bem Vindo</h3>
        <p>Junta-te ao nosso ecosistema Alumni ESMAD!</p>
      </div>
      <div class="col-md-9 register-right">
        <h3 class="register-heading">Registo Alumni</h3>
        <b-form @submit.prevent="register" class="row register-form">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Numero Estudante"
                v-model="registo.nroEstudante"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Nome Completo"
                v-model="registo.nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Palavra-Passe"
                v-model="registo.password"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Confirmar Palavra-Passe"
                v-model="passwordVerification"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="date"
                class="form-control"
                v-model="registo.data_Nasc"
                required
              />
            </div>

            <div class="form-group">
              <div class="maxl">
                <label class="radio inline">
                  <input
                    type="radio"
                    name="gender"
                    value="Masculino"
                    v-model="registo.genero"
                  />
                  <span> Masculino </span>
                </label>
                <label class="radio inline">
                  <input
                    type="radio"
                    name="gender"
                    v-model="registo.genero"
                    value="Feminino"
                  />
                  <span>Feminino </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                placeholder="Seu Email"
                value=""
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Morada"
                v-model="registo.morada"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="registo.nacionalidade"
                disabled
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Numero Cartão Cidadão"
                v-model="registo.CC"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                minlength="9"
                maxlength="9"
                name="txtEmpPhone"
                class="form-control"
                placeholder="Numero de telefone"
                v-model="registo.telemovel"
                required
              />
            </div>
            <label>{{ formErros }}</label>
            <br/>
            <input type="submit" value="REGISTER" />
          </div>
        </b-form>
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
        nroEstudante: "",
        nome: "",
        password: "",
        genero: "",
        morada: "",
        data_Nasc: "",
        email: "",
        telemovel: "",
        CC: "",
        nacionalidade: "Portuguese"
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
