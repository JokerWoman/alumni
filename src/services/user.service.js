import API_URL from "./config.js";

import { authHeader } from "./auth.service.js";

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
  async fetchAlumniSkillsById(user, numeroEstudante) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${numeroEstudante}/skills`,
        {
          method: "GET",
          headers: authHeader(user)
        }
      );

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
  async fetchAlumniLinksById(user, numeroEstudante) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${numeroEstudante}/links`,
        {
          method: "GET",
          headers: authHeader(user)
        }
      );

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
  async addAlumniLinkById(user, linkId, linkUrl) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/links/${linkId}`,
        {
          method: "POST",
          headers: authHeader(user),
          body: JSON.stringify({ link: linkUrl })
        }
      );
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
  async removeAlumniLinkById(user, linkId) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/links/${linkId}`,
        {
          method: "DELETE",
          headers: authHeader(user)
        }
      );
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
  async addAlumniToolById(user, toolId, percentagem) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/tools/${toolId}`,
        {
          method: "POST",
          headers: authHeader(user),
          body: JSON.stringify({ percentagem: percentagem })
        }
      );
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
  async updateAlumniToolById(user, toolId, percentagem) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/tools/${toolId}`,
        {
          method: "PUT",
          headers: authHeader(user),
          body: JSON.stringify({ percentagem: percentagem })
        }
      );
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
  async removeAlumniToolById(user, toolId) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/tools/${toolId}`,
        {
          method: "DELETE",
          headers: authHeader(user)
        }
      );
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
  async addAlumniSkillById(user, skillId, percentagem) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/skills/${skillId}`,
        {
          method: "POST",
          headers: authHeader(user),
          body: JSON.stringify({ percentagem: percentagem })
        }
      );
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
  async updateAlumniSkillById(user, skillId, percentagem) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/skills/${skillId}`,
        {
          method: "PUT",
          headers: authHeader(user),
          body: JSON.stringify({ percentagem: percentagem })
        }
      );
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
  async removeAlumniSkillById(user, skillId) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/skills/${skillId}`,
        {
          method: "DELETE",
          headers: authHeader(user)
        }
      );
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
  async addAlumniCursoById(user, cursoId, cursoAno) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/cursos/${cursoId}`,
        {
          method: "POST",
          headers: authHeader(user),
          body: JSON.stringify({ anoCurso: cursoAno })
        }
      );
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
  async removeAlumniCursoById(user, cursoId) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${user.id}/cursos/${cursoId}`,
        {
          method: "DELETE",
          headers: authHeader(user)
        }
      );
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
  async updateAlumniById(user, alumni) {
    if (user !== null) {
      const response = await fetch(`${API_URL}/alumni/${user.id}/`, {
        method: "PUT",
        body: JSON.stringify(alumni),
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
  async fetchAlumniCursosById(user, numeroEstudante) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${numeroEstudante}/cursos`,
        {
          method: "GET",
          headers: authHeader(user)
        }
      );

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
  async fetchAlumniToolsById(user, numeroEstudante) {
    if (user !== null) {
      const response = await fetch(
        `${API_URL}/alumni/${numeroEstudante}/tools`,
        {
          method: "GET",
          headers: authHeader(user)
        }
      );

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
