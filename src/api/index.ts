import { CustomURLType, PropertiesType } from "./types";

// export const API_URL = "https://api.superjob.ru";
// API_KEY in real project will be in .env
export const API_KEY = {
  "X-Api-App-Id":
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
};

export const endpoints = {
  AUTH: {
    LOGIN: "/2.0/oauth2/password/",
  },
  VACANCY: {
    SEARCH: "/2.0/vacancies/",
    ID: "/2.0/vacancies/",
  },
  FILTER: {
    CATALOGUES: "/2.0/catalogues/",
  },
};

const customFetch = async (
  url: string,
  method = "GET",
  body = null,
  headers = {
    Host: "api.superjob.ru",
    "Content-Type": "application/x-www-form-urlencoded",
    ...API_KEY,
  }
) => {
  return await fetch(url, { method, body, headers });
};

export const customURL: CustomURLType = (endpoint, properties = null) => {
  let customURL = `/api${endpoint}`;
  let isFirst = true;
  if (properties) {
    for (let property in properties) {
      if (!properties[property] || properties[property] === "0") {
        continue;
      }
      let propertyValue: string | number;
      switch (property) {
        case "page":
          propertyValue = properties[property] - 1;
          break;
        case "keyword":
          propertyValue = encodeURI(properties[property]);
          break;
        default:
          propertyValue = properties[property];
      }
      if (isFirst) {
        customURL += `?${property}=${propertyValue}`;
        isFirst = false;
      } else {
        customURL += `&${property}=${propertyValue}`;
      }
    }
  }
  if (customURL.includes("payment")) {
    customURL += "&no_agreement=1";
  }
  return customURL;
};

export const fetchVacancyById = async (id: number) => {
  const url = `/api${endpoints.VACANCY.ID + id}/`;
  return await customFetch(url);
};

export const fetchFilteredVacancie = async (
  properties: PropertiesType = null
) => {
  const url = customURL(endpoints.VACANCY.SEARCH, properties);
  return await customFetch(url);
};

export const fetchCatalogues = async () => {
  const url = `/api${endpoints.FILTER.CATALOGUES}`;
  return await customFetch(url);
};
