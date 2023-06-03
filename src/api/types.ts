export type PropertiesType = {
  [key: string]: any;
} | null;

export type CustomURLType = (
  endpoint: string,
  properties: PropertiesType
) => string;
