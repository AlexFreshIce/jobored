export type VacancyType = {
  id: number;
  profession: string;
  firm_name: string;
  town: { title: string };
  type_of_work: { title: string };
  payment_from: number;
  payment_to: number;
  currency: string;
  vacancyRichText: string;
};

export type VacanciesType = {
  objects: VacancyType[] | [];
  total: number;
};

export type FilterType = {
  published: number;
  catalogues: CataloguesType;
  payment_from: number;
  payment_to: number;
  keyword: string;
  page: number;
  count: number;
};

export type CatalogueType = {
  label: string;
  value: string;
};

export type CataloguesType = CatalogueType[] | [];
