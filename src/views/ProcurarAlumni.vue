<template>
  <AlumniList :alumnis="AlumnisInformation"> </AlumniList>
</template>

<script>
import AlumniList from "../components/AlumniList";

export default {
  name: "ProcurarAlumni",
  components: {
    AlumniList
  },
  created: function() {},
  computed: {
    AlumnisInformation() {
      return this.$store.getters.getAllAlumnisInformationExceptLoggedUser;
    }
  }
};
</script>

<style src="./../assets/perfil.css"></style>
