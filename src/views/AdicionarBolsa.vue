<template>
  <b-container>
    <div class="container">
      <h1>Adicionar</h1>
      <b-row class="justify-content-md-center">
        <b-alert variant="success" :show="showSuccess"
          >Bolsa Adicionada</b-alert
        >
      </b-row>
      <b-row class="justify-content-md-center">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Categoria"
            label-for="input-1"
          >
            <b-form-select
              id="input-1"
              v-model="task.category"
              :options="$store.getters.getCategoriesForSelect"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-2" label="Título" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="task.title"
              type="text"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Imagem" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="task.img"
              type="url"
              required
            ></b-form-input>
          </b-form-group>
          <b-col sm="30">
            <b-form-group
              size="lg"
              id="input-group-4"
              label="Descrição"
              label-for="input-4"
            >
              <b-form-textarea
                size="md"
                id="input-4"
                v-model="task.description"
                placeholder="Descrição da oferta"
                max-rows="8"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-button type="submit" variant="primary" class="mr-2"
            >Adicionar
          </b-button>

          <b-button type="reset" variant="danger">Limpar</b-button>
        </b-form>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "AdicionarBolsa",
  data() {
    return {
      task: {
        title: "",
        category: "",
        description: "",
        img: ""
      },
      showSuccess: false
    };
  },
  methods: {
    onSubmit() {
      const bolsa = {
        id: this.$store.getters.getNextBolsaId,
        title: this.task.title,
        category: this.task.category,
        description: this.task.description,
        img: this.task.img
      };
      this.$store.dispatch("saveBolsa", bolsa);
      this.showSuccess = true;
    },
    onReset() {
      this.showSuccess = false;
    }
  }
};
</script>
