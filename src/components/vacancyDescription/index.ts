import { FC } from "react";
import { VacancyDescriptionType } from "./types";
import { VacancyDescriptionComponent } from "./VacancyDescriptionComponent";

export const VacancyDescription: FC<VacancyDescriptionType> = (props) => {
  return VacancyDescriptionComponent(props);
};