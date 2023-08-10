import { ENDPOINTS } from ".";

export type PropertiesType = {
  [key: string]: any;
} | null;

export type CustomURLType = (
  endpoint: string,
  properties: PropertiesType
) => string;

export type CustomFetchType = (
  endpoint: ENDPOINTS,
  clientSecretKey: string,
  urlProperties?: PropertiesType,
  method?: string,
  data?: object | null,
  additionalHeaders?: object | null
) => Promise<Response>;
