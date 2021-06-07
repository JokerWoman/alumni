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
                :src="getEvent.img"
                alt="foto de um evento"
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
                <h2 class="mb-0" style="margin-left: 220px">
                  {{ getEvent.name }}
                </h2>
              </div>
              <br />

              <div style="height: 200px">
                <p style="width: 90%">{{ getEvent.description }}</p>
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

  methods: {},
  computed: {
    getEvent() {
      const event = this.$store.getters.getEventById(
        this.$route.params.eventId
      );
      return event;
    }
  }
};
</script>

<style></style>
