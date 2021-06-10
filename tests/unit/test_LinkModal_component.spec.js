import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import { shallowMount } from "@vue/test-utils";
import LinkModal from "@/components/LinkModal.vue";

describe("LinkModal.vue", () => {
  it("Verificar que o componente é renderizado correctamente.", () => {
    /* Mock do Parent que deveria ser o ou o Perfil.vue ou o EditarTools.vue ou EditarSkills */
    const Parent = {
      data: () => ({
        val: true
      }),
      methods: {
        AddLink(id, url) {
          console.log("id: " + id + " url: " + url);
        }
      },
      template: ""
    };

    const wrapper = shallowMount(LinkModal, {
      propsData: {
        modalTitle: "Adicionar Links",
        showModal: true,
        links: [
          {
            id_links: 1,
            tipoLink: "Linkedin"
          },
          {
            id_links: 2,
            tipoLink: "CV"
          }
        ]
      },
      parentComponent: Parent
    });

    expect(wrapper.text()).toContain("Linkedin");
    expect(wrapper.text()).toContain("CV");

    // testar o save e o close do Modal
    wrapper.vm.linkIdSelected = 1;
    wrapper.vm.url = "www.linkedin.com";
    wrapper.vm.save();

    expect(wrapper.vm.linkIdSelected === null);
    expect(wrapper.vm.url === "");
  });
});
