import { FC } from "react";
import { salary } from "../../utils";
import { VacancyHeaderComponent } from "./VacancyHeaderComponent";
import { VacancyHeaderType } from "./types";

export const VacancyHeader: FC<VacancyHeaderType> = (props) => {
  const { vacancy } = props;
  const resoultSalary = salary(vacancy);

  return VacancyHeaderComponent({ ...vacancy, resoultSalary });
};
