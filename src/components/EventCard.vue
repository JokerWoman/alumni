<template>
  <b-card
    :img-src="event.img"
    :title="event.name"
    img-top
    tag="article"
    :id="`cardEvent${event.id}`"
    img-height="200px"
    style="width: 280px; margin-left:50px; margin-right:50px; background-color:#DCEAFF"
    img-alt="Imagem do evento"
  >
    <b-card-text> {{ getDescription(event.description) }}</b-card-text>

    <router-link
      v-if="event.state == 'active'"
      :to="{ name: 'EventoVerMais', params: { eventId: event.id } }"
      class="btn btn-primary"
      variant="success"
    >
      Ver mais
    </router-link>

    <b-button v-else variant="danger" align-self disabled>Terminado</b-button>
    <b-button
      v-if="getLoggedUserType()"
      @click="setActiveEvent(event)"
      variant="danger"
      style="margin-left:20px"
      v-b-modal.editEventModal
      >Editar</b-button
    >
    <b-card-text></b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object
  },

  methods: {
    getLoggedUserType() {
      //Return true if logged user is an admin,
      return this.$store.getters.getLoggedProfessor ? true : false;
    },

    setActiveEvent(event) {
      this.$store.dispatch("setActiveEvent", event);
    },

    getDescription(desc) {
      if (desc.length < 60) {
        return desc;
      } else {
        return `${desc.substr(0, [60])}...`;
      }
    }
  }
};
</script>
