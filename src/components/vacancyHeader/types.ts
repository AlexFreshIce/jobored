import { VacancyType } from "../../types";

export type VacancyHeaderType = {
  vacancy: VacancyType;
};

export type VacancyHeaderComponentType = VacancyType & {
  resoultSalary: string;
};
