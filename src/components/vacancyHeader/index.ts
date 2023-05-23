import { FC } from "react";
import { VacancyHeaderType } from "./types";
import { salary } from "../../utils";
import { VacancyHeaderComponent } from "./VacancyHeaderComponent";

export const VacancyHeader: FC<VacancyHeaderType> = (props) => {
  const { vacancy } = props;
  const resoultSalary = salary(vacancy);

  return VacancyHeaderComponent({ ...vacancy, resoultSalary });
};
