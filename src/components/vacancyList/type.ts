import { VacanciesType } from "../../types";

export type VacancyListType = {
  vacancies: VacanciesType;
  isLocalPagination: boolean;
};

export type VacancyListComponentType = {
  vacanciesForRender: VacanciesType["objects"];
  vacanciesCount: number;
  isLoading: boolean;
  currentPage: number;
  lastPage: number;

  onChangeCurrentPage(page: number): void;
};
