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
    CATALOGUES: "/2.0/catalogues/",
  },
};

export const customURL = (endpoint, properties) => {
  let customURL = API_URL + endpoint;
  let isFirst = true;
  for (let property in properties) {
    if (
      !properties[property] ||
      properties[property] === "" ||
      properties[property] === "0"
    ) {
      continue;
    }
    if (property === "keyword") {
      const encodeKeyword = encodeURI(properties[property]);
      if (isFirst) {
        customURL += `?${property}=${encodeKeyword}`;
        isFirst = false;
      } else {
        customURL += `&${property}=${encodeKeyword}`;
      }
    }
    if (isFirst) {
      customURL += `?${property}=${properties[property]}`;
      isFirst = false;
    } else {
      customURL += `&${property}=${properties[property]}`;
    }
  }
  if (customURL.includes("payment")) {
    customURL += "&no_agreement=1";
  }
  return customURL;
};
