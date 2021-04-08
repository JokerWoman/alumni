<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <small>{{ title }}</small>
      </div>
      <div>
        <template v-if="edit === true">
          <button class="btn" v-on:click="decrease">
            -
          </button>
          <button class="btn" v-on:click="increase">
            +
          </button>
        </template>
      </div>
    </div>

    <div class="d-flex flex-row" style="margin-left:-6px;">
      <button
        style="margin-top:-20px;width:5px;"
        class="p-2 btn"
        v-if="edit === true"
        v-on:click="remove"
      >
        x
      </button>
      <div class="p-2 flex-fill">
        <div class="progress mb-3" style="height: 5px;">
          <div
            class="progress-bar bg-primary"
            role="progressbar"
            :style="{ width: percentagem + '%' }"
            :aria-valuenow="percentagem"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Competence",
  props: {
    title: String,
    originalPercentagem: Number,
    type: String,
    edit: Boolean
  },
  data: function() {
    return {
      percentagem: 0
    };
  },
  watch: {
    originalPercentagem: function(val) {
      this.percentagem = val;
    }
  },
  created: function() {
    this.percentagem = this.originalPercentagem;
  },
  methods: {
    increase() {
      if (this.percentagem + 10 < 100) {
        this.percentagem += 10;
      } else {
        this.percentagem = 100;
      }
      this.$parent.competenceChanged(this.title, this.type, this.percentagem);
    },
    decrease() {
      if (this.percentagem - 10 > 0) {
        this.percentagem -= 10;
      } else {
        this.percentagem = 0;
      }
      this.$parent.competenceChanged(this.title, this.type, this.percentagem);
    },
    remove() {
      this.$parent.competenceDeleted(this.title, this.type);
    }
  }
};
</script>

<style>
.btn-circle {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
}
</style>
