<template>
<div>
  <b-container>
    <b-row align-v="start">
      <b-col cols="2">
        <b-select v-model="selectedType" :options="eventTypes">
          <option value="null" disabled>Tipo</option>
        </b-select>
      </b-col>

      <b-col cols="2">
        <b-select v-model="selectedLocation" :options="eventLocations()">
          <option value="null" disabled>Localidade</option>
        </b-select>
      </b-col>

      <b-col cols="2" v-if="selectedType != null || selectedLocation != null">
        <b-button variant="danger" @click="limparFiltros">Limpar Filtros</b-button>
      </b-col>
      
      <b-col cols="2" v-if="getLoggedUserType()">
        <b-button variant="primary" v-b-modal.createEventModal>Create Event</b-button>
      </b-col>
    
    </b-row>

    <b-modal id="createEventModal" @show="clearForm" hide-footer>
          <b-form @submit.prevent="createEvent">

            <b-form-input type="text" v-model="frm.name" placeholder="Nome"></b-form-input> <br>

            <b-form-input type="text" v-model="frm.img"  placeholder="Imagem"></b-form-input> <br>

            <b-form-input type="text" v-model="frm.description"  placeholder="Descrição"></b-form-input> <br>
            
            <b-row>
              <b-col cols="6">
                <b-form-select v-model="frm.type" :options="eventTypes">
                  <option value="null" disabled>Tipo</option>
                </b-form-select>
              </b-col>

              <b-col cols="6">
                <b-form-select v-model="frm.location.city" :options="eventLocations()">
                  <option value="other">Outra</option>
                  <option value="null" disabled>Cidade</option>
                </b-form-select>
              </b-col>
            </b-row>

            <b-form-input type="text" v-if="frm.location.city == 'other'" v-model="frm.location.other" placeholder="Cidade" ></b-form-input> <br>

            <b-row>
              <b-col cols="6">
                <b-form-input type="date" v-model="frm.date"></b-form-input>
              </b-col>

              <b-col cols="6">
                <b-form-input type="time" v-model="frm.hour"></b-form-input> <br>
              </b-col>
            </b-row>

            <b-row class="justify-content-md-center">
                <b-button type="submit" variant="danger">Submeter</b-button>
            </b-row>

          </b-form>
      </b-modal>

      <b-modal id="editEventModal" @show="getActiveEvent" hide-footer>
          <b-form @submit.prevent="editEvent">

            <b-form-input type="text" v-model="frm.name" placeholder="Nome"></b-form-input> <br>

            <b-form-input type="text" v-model="frm.img"  placeholder="Imagem"></b-form-input> <br>

            <b-form-input type="text" v-model="frm.description"  placeholder="Descrição"></b-form-input> <br>
            
            <b-row>
              <b-col cols="6">
                <b-form-select v-model="frm.type" :options="eventTypes">
                  <option value="null" disabled>Tipo</option>
                </b-form-select>
              </b-col>

              <b-col cols="6">
                <b-form-select v-model="frm.location.city" :options="eventLocations()">
                  <option value="other">Outra</option>
                  <option value="null" disabled>Cidade</option>
                </b-form-select>
              </b-col>
            </b-row>

            <b-form-input type="text" v-if="frm.location.city == 'other'" v-model="frm.location.city" placeholder="Cidade" ></b-form-input> <br>

            <b-row>
              <b-col cols="6">
                <b-form-input type="date" v-model="frm.date"></b-form-input>
              </b-col>

              <b-col cols="6">
                <b-form-input type="time" v-model="frm.hour"></b-form-input> <br>
              </b-col>
            </b-row>

            <b-row class="justify-content-md-center">
              <b-button type="submit" style="margin-right:10px">Submeter</b-button>
              <b-button @click="deleteEvent()" data-mdb-dismiss="modal" style="margin-left:10px" variant="danger">Eliminar</b-button>
            </b-row>

          </b-form>
      </b-modal>
    
      <br><br>
  
  </b-container>

      <b-container 
      style="background-color: #2B4C8C;"
      fluid
      >

        <b-row>
          <b-card-group 
          style="margin:20px">
            <EventCard
              v-for="event in getEvents"
              :key="event.id"
              :event="event"
            />
          </b-card-group>
        </b-row>
      </b-container>
</div>
</template>

<script>

import EventCard from '../components/EventCard'

export default {
  name: "Eventos",

  components:{
    EventCard
  },

  data() {
    return {
      selectedType:null,
      selectedLocation:null,
      filtersActive:false,

      eventTypes: this.$store.getters.getEventTypes,

      frm:{
        name:"",
        type:null,
        location:{city : null , other:''},
        date:"",
        hour:"",
        img:"",
        description:"",
        id:""
      }
    }
  },

  methods:{

    getLoggedUserType(){

      return this.$store.getters.getLoggedProfessor ? true : false
    },

    eventLocations(){

      let citys = this.$store.getters.getEventLocations

      let cityOptions = []

      citys.forEach(city=>{

        cityOptions.push({"value":city,"text":city})
      })

      return cityOptions
    },

    limparFiltros(){
      
      this.selectedType = null,
      this.selectedLocation = null
    },

    createEvent(){

      const event = {
        id: this.$store.getters.getNextEventId,
        name: this.frm.name,
        type: this.frm.type,
        state:"active",
        location:{city : this.frm.location.city ? this.frm.location.city : this.frm.location.other},
        date:this.frm.date,
        hour:this.frm.hour,
        img:this.frm.img,
        description:this.frm.description
      }
      this.document.querySelector("#editEventModal").hide()
      this.$store.dispatch("createEvent", event)
    },

    editEvent(){

      let event = {
          name: this.frm.name,
          img: this.frm.img,
          location:{city: this.frm.location.city},
          date: this.frm.date,
          hour: this.frm.hour,
          description: this.frm.description,
          type: this.frm.type,
          state: this.frm.state,
          id: this.frm.id
      }
      this.$store.dispatch("editEvent", event)
      this.$bvModal.hide("editEventModal")
      this.clearForm()
    },

    deleteEvent(){

      const event = this.getEvents.find(event => event.id == this.frm.id)
      this.$store.dispatch("deleteEvent", event)
      this.clearForm()
    },
    
    getActiveEvent(){
      
      let event = this.$store.getters.getActiveEvent
      this.frm.name = event.name
      this.frm.img = event.img
      this.frm.location.city = event.location.city
      this.frm.date = event.date
      this.frm.hour = event.hour
      this.frm.description = event.description
      this.frm.type = event.type
      this.frm.id = event.id
      this.frm.state = event.state
    },

    clearForm(){
      this.frm.name =""
      this.frm.img =""
      this.frm.location.city = null
      this.frm.location.other = ""
      this.frm.date =""
      this.frm.hour=""
      this.frm.description =""
      this.frm.type = null
      this.frm.id =""
    }
  },

  
  computed:{  

    getEvents(){

      let events = this.$store.getters.getEvents

      this.selectedType !== null ? events = events.filter(event=> event.type === this.selectedType) : {}

      this.selectedLocation !== null ? events = events.filter(event=> event.location.city == this.selectedLocation) : {}

      return events
    },
    
  }
};
</script>