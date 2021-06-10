import API_URL from "./config.js";

import { authHeader } from "./auth.service.js";

export const EventoService = {
  async getAllEventos(user, filtros) {
    if (user != null) {
      var params = "";
      var url = new URL(`${API_URL}/eventos`);

      if (filtros.id_tipoEvento !== "") {
        params = { id_tipoEvento: filtros.id_tipoEvento };
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
        console.log(data.message);
        return data.message;
      } else {
        return null;
      }
    }
  },

  async fetchEventoById(user, id_evento) {
    if (user != null) {
      var url = new URL(`${API_URL}/eventos/${id_evento}`);

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
  async createEvento(user, evento) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers: authHeader(user),
        body: JSON.stringify(evento)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }
    }
  },

  async deleteEvento(user, id_evento) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/eventos/${id_evento}`, {
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
  },

  async editEvento(user, id_evento, evento) {
    if (user.userType == "professor") {
      const response = await fetch(`${API_URL}/eventos/${id_evento}`, {
        method: "PUT",
        headers: authHeader(user),
        body: JSON.stringify(evento)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }
    }
  }
};

export default EventoService;
