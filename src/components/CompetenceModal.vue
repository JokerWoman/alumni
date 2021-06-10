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

    <select v-model="competenceIdSelected">
      <template v-if="type === 'skill'">
        <option
          v-for="competence in competences"
          v-bind:value="competence.id_skills"
          v-bind:key="competence.id_skills"
        >
          {{ competence.tipoSkill }}
        </option>
      </template>
      <template v-else-if="type === 'tool'">
        <option
          v-for="competence in competences"
          v-bind:value="competence.id_tools"
          v-bind:key="competence.id_tools"
        >
          {{ competence.tipoTool }}
        </option>
      </template>
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
      competenceIdSelected: null
    };
  },
  created: function() {},
  methods: {
    save() {
      if (this.competenceIdSelected !== null) {
        this.$parent.competenceNew(
          this.competenceIdSelected,
          this.type,
          parseInt(this.percentagem)
        );
        this.close();
      }
    },
    close() {
      this.percentagem = 20;
      this.competenceIdSelected = null;
      this.$emit("close");
    }
  }
};
</script>
