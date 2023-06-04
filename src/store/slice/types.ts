import { CataloguesType, VacanciesType, VacancyType } from "../../types";

export type AuthStateType = {
  currentUser: {
    login: string;
    password: string;
    client_id: string;
    client_secret: string;
    hr: string;
  };
  accessToken: string | null;
  ttl:number,
  isAuth: boolean;
  isLoading: boolean;
  error: null | {};
};

export type FilterStateType = {
  filter: {
    published: number;
    catalogues: string | null;
    payment_from: number | null;
    payment_to: number | null;
    keyword: string;
    no_agreement?: number;
    page: number;
    count: number;
  };
  cataloguesArr: CataloguesType;
  isLoading: boolean;
  error: null | {};
};

export type VacancyStateType = {
  vacancies: VacanciesType;
  isLoading: boolean;
  error: null | {};
  currentVacancy: null | VacancyType;
  favoriteVacancies: VacanciesType;
};
