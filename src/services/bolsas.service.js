import API_URL from "./config.js";

import { authHeader } from "./auth.service.js";

export const BolsaService = {
  async fetchAllBolsas(user, filtros) {
    if (user != null) {
      var params = "";
      var url = new URL(`${API_URL}/bolsas`);

      if (filtros.id_tipoEmprego !== "") {
        params = { id_tipoEmprego: filtros.id_tipoEmprego };
      }

      if (params !== "") {
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(url, {
        method: "GET",
        headers: authHeader(user)
      });

      if (response.ok) {
        let data = await response.json();
        console.log(user);
        return data;
      } else {
        return null;
      }
    }
  },
  async fetchBolsaById(user, id_bolsas) {
    if (user != null) {
      var url = new URL(`${API_URL}/bolsas/${id_bolsas}`);

      const response = await fetch(url, {
        method: "GET",
        headers: authHeader(user)
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data.message);
        return data.message;
      } else {
        return null;
      }
    }
  },

  async createBolsa(user, bolsa) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/bolsas`, {
        method: "POST",
        headers: authHeader(user),
        body: JSON.stringify(bolsa)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }
    }
  },

  async editBolsa(user, id_bolsas, bolsa) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/bolsas/${id_bolsas}`, {
        method: "PUT",
        headers: authHeader(user),
        body: JSON.stringify(bolsa)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }
    }
  },

  async deleteBolsa(user, id_bolsas) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/bolsas/${id_bolsas}`, {
        method: "DELETE",
        headers: authHeader(user)
      });
      if (response.ok) {
        let data = await response.json();

        return data.message;
      } else {
        return null;
      }
    }
  }
};

export default BolsaService;
