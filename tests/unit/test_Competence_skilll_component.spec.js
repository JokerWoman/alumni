import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import { shallowMount } from "@vue/test-utils";
import Competence from "@/components/Competence.vue";

describe("Competence.vue", () => {
  it("Verificar que o component Competence é renderizado.", () => {
    /* Mock do Parent que deveria ser o ou o Perfil.vue ou o EditarTools.vue ou EditarSkills */
    const Parent = {
      data: () => ({
        val: true
      }),
      methods: {
        competenceChanged(id, type, percentagem) {
          console.log(
            "id: " + id + " type: " + type + " percentagem: " + percentagem
          );
        }
      },
      template: ""
    };

    const wrapper = shallowMount(Competence, {
      propsData: {
        id: 1,
        title: "Javascript",
        originalPercentagem: 30,
        type: "skill",
        edit: true
      },
      parentComponent: Parent
    });

    expect(wrapper.text()).toContain("Javascript");

    // testar a percentagem a incrementar
    wrapper.vm.increase();
    expect(wrapper.vm.percentagem === 40);

    // testar a percentagem a decrementar
    wrapper.vm.decrease();
    expect(wrapper.vm.percentagem === 30);
  });
});
