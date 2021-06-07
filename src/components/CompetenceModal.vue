<template>
  <b-modal
    v-model="showModal"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <template #modal-header>
      <h1 style="font-size: 25px" class="modal-title">
        {{ modalTitle }}
      </h1>
      <button type="button" @click="close" class="close">
        <span>&times;</span>
      </button>
    </template>

    <select v-model="competenceSelected">
      <option
        v-for="(competence, index) in competences"
        v-bind:value="competence.title"
        v-bind:key="index"
      >
        {{ competence.title }}
      </option>
    </select>
    <input
      type="number"
      v-model="percentagem"
      step="10"
      min="0"
      max="100"
      onKeyDown="return false"
    />

    <template #modal-footer>
      <b-button class="mt-1" variant="outline-info" block @click="save"
        >Guardar</b-button
      >
      <b-button class="mt-1" variant="outline-danger" block @click="close"
        >Cancelar</b-button
      >
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "CompetenceModal",
  props: {
    modalTitle: String,
    showModal: Boolean,
    type: String,
    competences: Array
  },
  data: function() {
    return {
      percentagem: 20,
      competenceSelected: null
    };
  },
  created: function() {},
  methods: {
    save() {
      if (this.competenceSelected !== null) {
        this.$parent.competenceNew(
          this.competenceSelected,
          this.type,
          parseInt(this.percentagem)
        );
        this.close();
      }
    },
    close() {
      this.percentagem = 20;
      this.competenceSelected = null;
      this.$emit("close");
    }
  }
};
</script>
