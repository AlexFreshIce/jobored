// export const API_URL = "https://api.superjob.ru";
export const API_KEY = {
  "X-Api-App-Id":
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
};

export type PropertiesType = {
  [key: string]: any;
} | null;

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

export const customURL = (endpoint: string, properties: PropertiesType) => {
  let customURL = `/api${endpoint}`;
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
