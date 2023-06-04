import { FC } from "react";
import { VacancyDescriptionComponent } from "./VacancyDescriptionComponent";
import { VacancyDescriptionType } from "./types";

export const VacancyDescription: FC<VacancyDescriptionType> = (props) => {
  return VacancyDescriptionComponent(props);
};
