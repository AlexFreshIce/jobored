
export const API_URL = "https://startup-summer-2023-proxy.onrender.com";

export const API_KEY = { "x-secret-key": "GEU4nvd3rej*jeh.eqp" };


export const endpoints = {
  AUTH: {
    LOGIN: "/2.0/oauth2/password/",
    // REFRESH: "/refresh",
    // LOGOUT: "/logout",
  },
  VACANCY: {
    SEARCH: "/2.0/vacancies/",
    ID: "/2.0/vacancies/",
  },
  FILTER: {
    CATALOGUES: "/2.0/catalogues/"
  }
};

export const customURL = (endpoint, obj) => {
  let customURL = API_URL + endpoint;
  let isFirst = true;
  for (let objKey in obj) {
    if (!obj[objKey] || obj[objKey] === "" || obj[objKey] === "0") {
      continue;
    } else if (isFirst) {
      customURL += `?${objKey}=${obj[objKey]}`;
      isFirst = false;
    } else {
      customURL += `&${objKey}=${obj[objKey]}`;
    }
  }
  return customURL
};

