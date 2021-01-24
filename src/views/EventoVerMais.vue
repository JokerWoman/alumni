<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-lg-4 mb-3">
          <div class="container" style="margin-top: 20px">
            <div
              style="
                width: 250px;
                height: 250px;
                border-radius: 10%;
                overflow: hidden;
              "
            >
              <img
                :src="this.getEvent.img"
                alt="Indisponivel"
                width="250"
                height="250"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="container">
            <div>
              <div class="row">
                <div class="col-sm-3">
                  <h2 class="mb-0" style="margin-left: 220px">
                    {{ this.getEvent.title }}
                  </h2>
                </div>
              </div>
              <br />

              <div style="height: 200px">
                <p style="width: 90%">{{ this.getEvent.description }}</p>

              
              </div>
              <br />
              <br />
              
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventoVerMais",
  data(){
return{
  getEvent:''
}
  },

  methods: {
    
  },
  created(){
   this.getEvent =  this.$store.state.events.filter(event => event.id == this.$route.params.eventId)
  },
  computed: {
  
  },
};
</script>

<style></style>
