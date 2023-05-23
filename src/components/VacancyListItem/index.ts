import { FC } from "react";
import { VacancyListItemType } from "./types";
import { VacancyListItemComponent } from "./VacancyListItemComponent";

export const VacancyListItem: FC<VacancyListItemType> = (props) => {
  return VacancyListItemComponent(props);
};
