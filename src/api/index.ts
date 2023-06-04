import {
  CustomFetchType,
  CustomURLType,
  FetchAuthType,
  FetchCataloguesType,
  FetchFilteredVacancieType,
  FetchRefreshTokenType,
  FetchVacancyByIdType,
} from "./types";

enum ENDPOINTS {
  LOGIN = "/2.0/oauth2/password/",
  REFRESHTOKEN = "/2.0/oauth2/refresh_token/",
  VACANCY = "/2.0/vacancies/",
  CATALOGUES = "/2.0/catalogues/",
}

const customFetch: CustomFetchType = async (
  url,
  method = "GET",
  data = null,
  headers = null
) => {
  const body = data ? JSON.stringify(data) : null;
  return await fetch(url, {
    method,
    body,
    headers: {
      Host: "api.superjob.ru",
      ...headers,
    },
  });
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

export const fetchVacancyById: FetchVacancyByIdType = async (
  id,
  clientSecretKey
) => {
  const url = `/api${ENDPOINTS.VACANCY + id}/`;
  return await customFetch(url, "GET", null, {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Api-App-Id": clientSecretKey,
  });
};

export const fetchFilteredVacancie: FetchFilteredVacancieType = async (
  properties,
  clientSecretKey
) => {
  const url = customURL(ENDPOINTS.VACANCY, properties);
  return await customFetch(url, "GET", null, {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Api-App-Id": clientSecretKey,
  });
};

export const fetchCatalogues: FetchCataloguesType = async () => {
  const url = `/api${ENDPOINTS.CATALOGUES}`;
  return await customFetch(url, "GET", null, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};

export const fetchAuth: FetchAuthType = async (properties) => {
  const url = customURL(ENDPOINTS.LOGIN, properties);
  return await customFetch(url);
};

export const fetchRefreshToken: FetchRefreshTokenType = async (properties) => {
  const url = customURL(ENDPOINTS.REFRESHTOKEN, properties);
  return await customFetch(url);
};
