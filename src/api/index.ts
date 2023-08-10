import { CustomFetchType, CustomURLType } from "./types";

export enum ENDPOINTS {
  LOGIN = "/2.0/oauth2/password/",
  REFRESHTOKEN = "/2.0/oauth2/refresh_token/",
  VACANCY = "/2.0/vacancies/",
  CATALOGUES = "/2.0/catalogues/",
}

export const customFetch: CustomFetchType = async (
  endpoint,
  clientSecretKey,
  urlProperties = null,
  method = "GET",
  data = null,
  additionalHeaders = null
) => {
  const url = customURL(endpoint, urlProperties);
  const body = data ? JSON.stringify(data) : null;
  const headers = {
    Host: "api.superjob.ru",
    "X-Api-App-Id": clientSecretKey,
    "Content-Type": "application/x-www-form-urlencoded",
    ...additionalHeaders,
  };
  return await fetch(url, {
    method,
    body,
    headers,
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
        case "vacancyID":
          return customURL + properties[property] + "/";
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
