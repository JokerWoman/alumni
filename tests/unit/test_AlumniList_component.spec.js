import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import { shallowMount } from "@vue/test-utils";
import AlumniList from "@/components/AlumniList.vue";

describe("AlumniList.vue", () => {
    it("Verificar que o component Alumni List é renderizado.", () => {
        const wrapper = shallowMount(AlumniList, {
            propsData: {
                alumnis: [{
                        nome: "Andrea",
                        id_nroEstudante: "19184845",
                        email: "andrea@gmail.com"
                    },
                    {
                        nome: "Estela",
                        id_nroEstudante: "555555",
                        email: "estela@gmail.com"
                    }
                ]
            }
        });

        expect(wrapper.text()).toContain("Andrea");
        expect(wrapper.text()).toContain("Estela");
    });
});