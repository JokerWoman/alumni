<template> 

    <b-card 
        :img-src="event.img"
        :title="event.name"
        :text="event.description"
        img-top
        tag="article"
        :id="`cardEvent${event.id}`"
        img-height="150px"
        style="width: 220px"
    >
        <b-card-text> {{ event.description }}</b-card-text>
          <router-link
          v-if="event.state == 'active'"
      :to="{ name: 'EventoVerMais', params: { eventId: event.id } }"
      class="btn btn-primary"
      variant="success"
    >
      Ver mais 
    </router-link>
        <b-button v-else variant="danger" align-self disabled>Terminado</b-button>
        <b-button v-if="getLoggedUserType() == 'admin'" @click="editEvent(event)" variant="danger" v-b-modal.editEventModal>Editar</b-button>
        <b-card-text></b-card-text>
    </b-card>
</template>

<script>
export default {
    name:"EventCard",
    props:{
        event: Object
    },

    methods:{
        getLoggedUserType(){
            return this.$store.getters.getLoggedUser.type
        },

        editEvent(event){
            this.$store.dispatch("setActiveEvent",event)

        }
    
    
    
    }
}
</script>