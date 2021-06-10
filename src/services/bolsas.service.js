import API_URL from "./config.js";


export const BolsaService = {
  async fetchAllBolsas(filtros) {
      var params = "";
      var url = new URL(`${API_URL}/bolsas`);


      if (filtros.id_tipoEmprego !== "" ) {
        params = { id_tipoEmprego: filtros.id_tipoEmprego};
      } 

      if (params !== "") {
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(url, {
        method: "GET",
       
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data)
        return data;
      } else {
        return null;
      }
      
    
  },
  async fetchBolsaById(id_bolsas){
    var url = new URL(`${API_URL}/bolsas/${id_bolsas}`)

    const response = await fetch(url, {
      method: "GET",
     
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data.message)
      return data.message;
    } else {
      return null;
    }

  },

  async createBolsa(bolsa){
    const response = await fetch(`${API_URL}/bolsas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(bolsa)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }
    },

  async editBolsa(id_bolsas, bolsa){
    const response = await fetch(`${API_URL}/bolsas/${id_bolsas}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(bolsa)
      });

      let data = await response.json();

      if (!response.ok) {
        throw Error(data.message);
      }

  },

  async deleteBolsa(id_bolsas){
    const response = await fetch(
      `${API_URL}/bolsas/${id_bolsas}`,
      {
        method: "DELETE",
        
      }
    );
    if (response.ok) {
      let data = await response.json();

      return data.message;
    }else {
      return null;
    }
    

  }

};

export default BolsaService;