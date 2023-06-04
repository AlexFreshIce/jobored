export type PropertiesType = {
  [key: string]: any;
} | null;

export type CustomURLType = (
  endpoint: string,
  properties: PropertiesType
) => string;

export type CustomFetchType = (
  url: string,
  method?: string,
  data?: object | null,
  headers?: object | null
) => Promise<Response>;

export type FetchVacancyByIdType = (
  id: number,
  clientSecretKey: string,
) => Promise<Response>;

export type FetchFilteredVacancieType = (
  properties: PropertiesType,
  clientSecretKey: string
) => Promise<Response>;

export type FetchCataloguesType = () => Promise<Response>;

export type FetchAuthType = (properties: PropertiesType) => Promise<Response>;

export type FetchRefreshTokenType = (properties: PropertiesType) => Promise<Response>;
