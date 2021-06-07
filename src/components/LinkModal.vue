<template>
  <b-modal
    v-model="showModal"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <template #modal-header>
      <h4 class="modal-title">
        {{ modalTitle }}
      </h4>
      <button type="button" @click="close" class="close">
        <span>&times;</span>
      </button>
    </template>

    <select v-model="linkSelected">
      <option
        v-for="(link, index) in links"
        v-bind:value="link.title"
        v-bind:key="index"
      >
        {{ link.title }}
      </option>
    </select>
    <input id="link" type="url" v-model="url" placeholder="link .." required />

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
  name: "LinkModal",
  props: {
    modalTitle: String,
    showModal: Boolean,
    type: String,
    links: Array
  },
  data: function() {
    return {
      url: "",
      linkSelected: null
    };
  },
  created: function() {
    console.log(this.links);
  },
  methods: {
    save() {
      if (this.linkSelected !== null) {
        this.$parent.AddLink(this.linkSelected, this.url);
        this.close();
      }
    },
    close() {
      this.url = "";
      this.linkSelected = null;
      this.$emit("close");
    }
  }
};
</script>
