<template>
  <div class="home">

      <b-img right src="@/assets/img/home.png" class="img-responsive w-75">
      </b-img>

    <div id="layer">
    </div>

    <b-container>
      <b-row>
        <b-card-group columns>
          <TestimonyCard
            v-for="testimony in getTestimonys"
            :key="testimony.id"
            :testimony="testimony"
          />
        </b-card-group>
      </b-row>
    </b-container>

  </div>
</template>

<style>

    #layer{

        height: 800px;
    }
</style>

<script>

import TestimonyCard from '../components/TestimonyCard'

export default {

  name: "Home",
  
  components: {
     TestimonyCard
  },

  methods:{
  },

  computed:{
    
    getTestimonys(){

      return this.$store.getters.getTestimonys
    }
  }
};
</script>
