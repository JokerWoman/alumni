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

    <select v-model="linkIdSelected">
      <option
        v-for="link in links"
        v-bind:value="link.id_links"
        v-bind:key="link.id_links"
      >
        {{ link.tipoLink }}
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
      linkIdSelected: null
    };
  },
  created: function() {
    console.log(this.links);
  },
  methods: {
    save() {
      if (this.linkIdSelected !== null) {
        this.$parent.AddLink(this.linkIdSelected, this.url);
        this.close();
      }
    },
    close() {
      this.url = "";
      this.linkIdSelected = null;
      this.$emit("close");
    }
  }
};
</script>
