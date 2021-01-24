<template>
  <b-container>
    <div >
      <b-row class="justify-content-md-center">
      <h1>Adicionar </h1>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-alert variant="success" :show="showSuccess"
          >Oferta Adicionada</b-alert
        >
      </b-row>

      <b-row class="justify-content-md-center">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group id="input-group-2" label="Título" label-for="input-2" >
            <b-form-input 
              id="input-2"
              v-model="task.title"
              type="text"
              required
            >
            </b-form-input>
          </b-form-group>
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

          <b-form-group
            id="input-group-5"
            label="Localidade"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="task.locality"
              type="text"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="Telefone" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="task.phone"
              type="number"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-7" label="Email" label-for="input-7">
            <b-form-input
              id="input-7"
              v-model="task.email"
              type="email"
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
          <b-form-group id="input-group-8" label="linkOferta" label-for="input-8">
            <b-form-input
              id="input-8"
              v-model="task.linkBolsa"
              type="url"
              required
            ></b-form-input>
          </b-form-group>
          <b-col sm="20">
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
        img: "",
        locality: "",
        phone: "",
        email: "",
        linkBolsa:""
      },
      showSuccess: false,
    };
  },
  methods: {
    onSubmit() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      const bolsa = {
        id: this.$store.getters.getNextBolsaId,
        title: this.task.title,
        category: this.task.category,
        description: this.task.description,
        img: this.task.img,
        locality: this.task.locality,
        date: date,
        phone: this.task.phone,
        email: this.task.email,
        linkBolsa: this.task.linkBolsa,
        estado: "ativo",
      };
      this.$store.dispatch("saveBolsa", bolsa);
      this.showSuccess = true;
    },
    onReset() {
      this.showSuccess = false;
    },
  },
};
</script>
