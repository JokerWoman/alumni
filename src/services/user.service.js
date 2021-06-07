import API_URL from "./config.js";

function authHeader(user) {
  // if there is a logged in user with accessToken (JWT)
  if (user.accessToken && user.userType) {
    // return HTTP authorization header for Node.js Express back-end
    return {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
      "user-type": user.userType
    };
  } else {
    return { "Content-Type": "application/json" }; //otherwise, return an empty object
  }
}

export const UserService = {
  async fetchAllAlumni(user, filtros) {
    if (user !== null) {
      var params = "";
      var url = new URL(`${API_URL}/alumni/`);

      if (filtros.nome !== "" && filtros.email !== "") {
        params = { nome: filtros.nome, email: filtros.email };
      } else if (filtros.nome !== "") {
        params = { nome: filtros.nome };
      } else if (filtros.email !== "") {
        params = { email: filtros.email };
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
        return data.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  async fetchAlumniById(user, numeroEstudante) {
    if (user !== null) {
      const response = await fetch(`${API_URL}/alumni/${numeroEstudante}`, {
        method: "GET",
        headers: authHeader(user)
      });

      if (response.ok) {
        let data = await response.json();
        return data.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  async fetchProfessorById(user, numeroProfessor) {
    if (user !== null) {
      const response = await fetch(`${API_URL}/professor/${numeroProfessor}`, {
        method: "GET",
        headers: authHeader(user)
      });

      if (response.ok) {
        let data = await response.json();
        return data.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export default UserService;
