import API_URL from "./config.js";

import { authHeader } from "./auth.service.js";

export const SkillService = {
  async fetchAlumniAvailableSkillsById(user) {
    if (user !== null) {
      var url = new URL(`${API_URL}/skills/alumni/${user.id}/disponiveis`);

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
  }
};

export default SkillService;
