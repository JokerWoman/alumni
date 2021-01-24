<template>
<div>
  <b-container fluid>
    <b-img right src="@/assets/img/home.png" class="img-responsive w-75">
    </b-img>

    <div id="layer"></div>
  </b-container>
  
    <b-container
    style="background-color: #2B4C8C; height:500px;"
    fluid
    >
    <div
    style="background-color: #FF7F61; margin-top: 0px; width: 160px; height: 41px; padding:7px"
    >
    <h4 style="color:white;">Testemunhas</h4>
    </div>

      <b-row>
        <b-card-group
        style="margin:20px"
        >
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
#layer {
  height: 800px;
}
</style>

<script>
import TestimonyCard from "../components/TestimonyCard";

export default {
  name: "Home",

  components: {
    TestimonyCard
  },

  methods: {},

  computed: {
    getTestimonys() {
      return this.$store.getters.getTestimonys;
    }
  }
};
</script>
