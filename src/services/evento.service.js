import API_URL from "./config.js";

export const EventoService = {
  async getAllEventos() {
    var url = new URL(`${API_URL}/evento/`);

    const response = await fetch(url, {
      method: "GET"
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data.message);
      return data.message;
    } else {
      return null;
    }
  },

  async GetEventoByID(id) {
    var url = new URL(`${API_URL}/evento/${id}`);

    const response = await fetch(url, {
      method: "GET"
    });
    if (response.ok) {
      let data = await response.json();
      console.log(data.message);
      return data.message;
    } else {
      return null;
    }
  },
  async createEvento() {
    var url = new URL(`${API_URL}/evento/`);

    const response = await fetch(url, {
      method: "POST"
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data.message);
      return data.message;
    } else {
      return null;
    }
  },

  async deleteEvento() {
    var url = new URL(`${API_URL}/evento/`);

    const response = await fetch(url, {
      method: "DELETE"
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data.message);
      return data.message;
    } else {
      return null;
    }
  },

  async updateEventoById(id) {
    var url = new URL(`${API_URL}/evento/${id}`);

    const response = await fetch(url, {
      method: "PUT"
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data.message);
      return data.message;
    } else {
      return null;
    }
  }
};

export default EventoService;
