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

    <select v-model="cursoIdSelected">
      <option
        v-for="curso in cursos"
        v-bind:value="curso.id_cursos"
        v-bind:key="curso.id_cursos"
      >
        {{ curso.tipoCurso }}
      </option>
    </select>
    <input
      type="number"
      v-model="ano"
      step="1"
      min="2015"
      max="2021"
      required
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
  name: "CursoModal",
  props: {
    modalTitle: String,
    showModal: Boolean,
    type: String,
    cursos: Array
  },
  data: function() {
    return {
      ano: 2020,
      cursoIdSelected: null
    };
  },
  created: function() {},
  methods: {
    save() {
      console.log("save!!");

      if (this.cursoIdSelected !== null) {
        console.log("aaaaa");
        this.$parent.AddCurso(this.cursoIdSelected, parseInt(this.ano));
        this.close();
      }
    },
    close() {
      this.ano = 2020;
      this.cursoIdSelected = null;
      this.$emit("close");
    }
  }
};
</script>
