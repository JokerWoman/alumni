<template>
  <div id="login">
    <form @submit.prevent="login">
      Username:
      <input type="text" id="txtUsername" v-model="nroEstudante" /><br />
      Password:
      <input type="password" id="txtPassword" v-model="password" /><br />
      <input type="submit" value="LOGIN" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      nroEstudante: "",
      password: ""
    };
  },
  methods: {
    login() {
      try {
        /* Chamar a ação disponivel no store */
        this.$store.dispatch("login", this.$data);

        /* Se o login falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o home não vai ser executado */
        this.$router.push({ name: "Home" });
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>
