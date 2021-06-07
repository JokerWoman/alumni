<template>
  <b-card
    :title="getCompanyName(company.id_company)"
    img-top
    tag="article"
    :id="`cardEvent${company.id_company}`"
    style="width:260px; margin-left:50px; margin-right:50px; background-color:#f3f3fb"
    class="text-center"
  >
    <b-button
      v-if="isLoggedProfessor()"
      @click="setActiveCompany(company)"
      variant="danger"
      v-b-modal.editCompanyModal
      >Editar</b-button
    >
  </b-card>
</template>

<script>
export default {
  name: "CompanyCard",
  props: {
    company: Object
  },
  methods: {
    isLoggedProfessor() {
      return this.$store.getters.getLoggedProfessor ? true : false;
    },
    getCompanyName(id) {
      var company = this.$store.getters.getCompanyById(id);
      return company.name;
    },
    setActiveCompany(company) {
      this.$store.dispatch("setActiveCompany", company);
    }
  }
};
</script>
