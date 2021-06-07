import API_URL from "./config.js";

export function authHeader(user) {
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

export const AuthService = {
  async loginAlumni(alumniCredentials) {
    const response = await fetch(`${API_URL}/auth/signin/alumni`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(alumniCredentials)
    });

    let data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }

    if (JSON.parse(data).accessToken) {
      return data;
    } else {
      return null;
    }
  },
  async loginProfessor(professorCredentials) {
    const response = await fetch(`${API_URL}/auth/signin/professor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(professorCredentials)
    });

    let data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }

    if (JSON.parse(data).accessToken) {
      return data;
    } else {
      return null;
    }
  },

  async register(user) {
    const response = await fetch(`${API_URL}/auth/signup/alumni`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(user)
    });

    let data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }
  }
};
export default AuthService;
